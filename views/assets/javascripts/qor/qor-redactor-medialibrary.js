// Add media library button for redactor editor
// By Jason weng @theplant

$.Redactor.prototype.medialibrary = function() {
    return {
        init: function () {
            var button = this.button.add('medialibrary', 'MediaLibrary');
            this.button.addCallback(button, this.medialibrary.addMedialibrary);
        },

        addMedialibrary: function () {
            var $element = this.$element,
                data = {},
                mediaboxUrl = $element.data('medialibrary-url'),
                BottomSheets;

            this.medialibrary.BottomSheets = BottomSheets = $('body').data('qor.bottomsheets');
            data.url = mediaboxUrl;

            BottomSheets.open(data, this.medialibrary.handleMediaLibrary);
        },

        handleMediaLibrary: function () {
            var $bottomsheets = $('.qor-bottomsheets'),
                options = {
                    formatOnSelect: this.medialibrary.formatSelectResults,  // render selected item after click item lists
                    formatOnSubmit: this.medialibrary.formatSubmitResults   // render new items after new item form submitted
                };

                $bottomsheets.qorSelectCore(options).addClass('qor-bottomsheets__mediabox').find('.qor-button--new').data('ingore-submit', true);
        },

        formatSelectResults: function (e, data) {
            this.medialibrary.formatResults(e, data);
        },

        formatSubmitResults: function (e, data) {
            this.medialibrary.formatResults(e, data, true);
        },

        formatResults: function (e, data, isNew) {
            var json = {},
                src;

            isNew ? src = JSON.parse(data.MediaOption).URL : src = $(data.Image).prop('src');
            src = src.replace(/image\..+\./, 'image.');

            json.url = src;

            // insert: function(json, direct, e)
            this.image.insert(json, false, e);
            this.medialibrary.BottomSheets.hide();
        }


    };
};