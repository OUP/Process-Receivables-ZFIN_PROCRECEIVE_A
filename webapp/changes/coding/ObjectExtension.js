/***
@controller Name:sap.suite.ui.generic.template.ObjectPage.view.Details,
*@viewId:mdm.cmd.product.maintain::sap.suite.ui.generic.template.ObjectPage.view.Details::C_Product
*/

(function () {
  jQuery.sap.registerModulePath(
    "oup.fab.lib.common",
    "/sap/bc/ui5_ui5/sap/zoupfab_common/"
  );
})();

sap.ui.define(
  ["sap/ui/core/mvc/ControllerExtension", "sap/base/Log"],
  function (ControllerExtension, Log) {
    "use strict";

    let _oView = null;

    return ControllerExtension.extend(
      "customer.ZFIN_PROCRECEIVE_A.ObjectExtension",
      {
        override: {
          /**
           * Called when a controller is instantiated and its View controls (if available) are already created.
           * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
           * @memberOf customer.ZFIN_PROCRECEIVE_A.ObjectExtension
           */
          onInit: function () {
            _oView = this.getView();
            // set footer create email button
            this._createEmailBtn();
          },
        },

        /***********************************************************************/
        /*                          INTERNAL METHODS                           */
        /***********************************************************************/

        _loadLibrary: function () {
          // load busy indicator
          sap.ui.core.BusyIndicator.show(0);

          return new Promise((resolve, reject) => {
            // lazy lib loaded asynchronously (the preferred way!!!)
            sap.ui
              .getCore()
              .loadLibrary("oup.fab.lib.common", {
                async: true,
              })
              .then((_) => resolve())
              .catch((_) => reject())
              .finally((_) => {
                // hide busy indicator
                sap.ui.core.BusyIndicator.hide();
              });
          });
        },

        _createEmailBtn: function () {
          this._loadLibrary()
            .then((_) => {
              // create email button

              // get view footer
              const oFooter = _oView.getContent()[0].getFooter();

              /*eslint-disable*/
              const oControl = new oup.fab.lib.common.controls.CreateEmail({
                appID: "PRR",
              });
              /*eslint-enable*/

              // footer content
              let aContentRight = oFooter.getContentRight();

              // add email button item to footer
              if (aContentRight.length !== 0) {
                let oFooterAction = aContentRight[aContentRight.length - 1];

                oFooter.removeContentRight(oFooterAction);
                oFooter.addContentRight(oControl);
                oFooter.addContentRight(oFooterAction);
              } else {
                oFooter.addContentRight(oControl);
              }
            })
            .catch((_) => Log.fatal("Unable to load common library!"));
        },
      }
    );
  }
);
