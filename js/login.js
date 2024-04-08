(function ($, Drupal, window, document) {
  'use strict';

  Drupal.behaviors.magic_user = {
    attach: async function (context, drupalSettings) {
      let apikeypublic = drupalSettings.apikeypublic;
      let network = drupalSettings.network;
      let redirect_url = drupalSettings.redirect_url;

      $('#magic-script').click(function (event) {
        event.preventDefault()
        const connectWIthUi = async () => {
          try {
            var magic = new Magic(apikeypublic, {
              network: network
            });
            const provider = await magic.wallet.getProvider();
            const web3 = new Web3(provider);
            const token = await magic.wallet.connectWithUI();

            await magic.preload().then(() => console.log('Magic <iframe> loaded.'));
            console.log('redirect....');
            // Move it to request header.
            window.location.href = redirect_url + '?did_token=' + token[0];
          } catch (e) {
            console.error(e)
          }
        }
        let promiEvent;
        promiEvent = connectWIthUi()
      });
    }
  };
}(jQuery, Drupal, this, this.document));
