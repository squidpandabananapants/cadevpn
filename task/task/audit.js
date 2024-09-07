const { namespaceWrapper } = require('@_koii/namespace-wrapper');
let server_url = 'http://ec2-34-207-236-225.compute-1.amazonaws.com/';

class Audit {
  /**
   * Validates the submission value by your logic
   *
   * @param {string} submission_value - The submission value to be validated
   * @param {number} round - The current round number
   * @param {number} submitter_pubkey - The submitter pubkey **TODO NEW**
   * @returns {Promise<boolean>} The validation result, return true if the submission is correct, false otherwise
   */
  async validateNode(submission_value, round, submitter_pubkey) {
    let vote;
    console.log('SUBMISSION VALUE', submission_value, round);
    let query = server_url + 'downloads/' + encodeURIComponent(submission_value) ;
    // console.log('query is ' + query)

    try {
      axios.get(query)
        .then(function (result) {
            let pubkey = result.data;
            if (result) {
              // Hardcoded debug line
              // TODO - remove following line when submitter pubkey is finished
                if (!submitter_pubkey) submitter_pubkey = pubkey; // this line forces audit success
                
                let audit_result = (pubkey === submitter_pubkey);
                if (audit_result) vote = audit_result;
            } else {
                console.log('no reply for downloads')
            }
        })
    } catch (e) {
      console.error(e);
      vote = false;
    }
    return vote;
  }
  /**
   * Audits the submission value by your logic
   *
   * @param {number} roundNumber - The current round number
   * @returns {void}
   */
  async auditTask(roundNumber) {
    console.log('AUDIT CALLED IN ROUND', roundNumber);
    console.log('CURRENT SLOT IN AUDIT', await namespaceWrapper.getSlot());
    await namespaceWrapper.validateAndVoteOnNodes(this.validateNode, roundNumber);
  }
}
const audit = new Audit();
module.exports = { audit };
