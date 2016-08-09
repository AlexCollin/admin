$(function () {

    'use strict';

    var $body = $('body'),
        Slideout,
        BottomSheets,

        CLASS_IS_SELECTED = 'is-selected',

        hasSlideoutTheme = $body.hasClass('qor-theme-slideout'),
        isSlideoutOpened = function(){
            return $body.hasClass('qor-slideout-open');
        };


    $body.qorBottomSheets();
    if (hasSlideoutTheme) {
        $body.qorSlideout();
    }

    Slideout = $body.data('qor.slideout');
    BottomSheets = $body.data('qor.bottomsheets');

    function clearSelectedCss () {
        $('[data-url]').removeClass(CLASS_IS_SELECTED);
    }

    function toggleSelectedCss (ele) {
        $('[data-url]').removeClass(CLASS_IS_SELECTED);
        ele.addClass(CLASS_IS_SELECTED);
    }

    function collectSelectID () {
        var $checked = $('.qor-table tbody').find('.mdl-checkbox__input:checked'),
            IDs = [];

        if (!$checked.size()) {
            return;
        }

        $checked.each(function () {
            IDs.push($(this).closest('tr').data('primary-key'));
        });

        return IDs;
    }

    $(document).on('click.qor.openUrl', '[data-url]', function (e) {
        var $this = $(this),
            isNewButton = $this.hasClass('qor-button--new'),
            isEditButton = $this.hasClass('qor-button--edit'),
            isInTable = $this.is('.qor-table tr[data-url]'),
            isActionButton = $this.hasClass('qor-action-button'),
            data = $this.data(),
            actionSelectedData;

        if ($(e.target).hasClass("material-icons")) {
            return;
        }

        if (isActionButton) {
            actionSelectedData = collectSelectID();
            data = $.extend({}, data, {
              actionSelectedData: actionSelectedData
            });
        }

        if (!data.method || data.method.toUpperCase() == "GET") {
            // Slideout or New Page: table items, new button, edit button
            if (isInTable || isNewButton || isEditButton || data.openType == 'slideout') {
                if (hasSlideoutTheme) {
                    if ($this.hasClass(CLASS_IS_SELECTED)) {
                        Slideout.hide();
                        clearSelectedCss();
                    } else {
                        Slideout.open(data);
                        toggleSelectedCss($this);
                        return false;
                    }
                } else {
                    window.location = data("url");
                }
                return;
            }

            // Open in BottmSheet: slideout is opened or openType is Bottom Sheet
            if (isSlideoutOpened() || isActionButton || data.openType == 'bottom-sheet') {
                BottomSheets.open(data);
                return false;
            }

            // Other clicks
            if (hasSlideoutTheme) {
                Slideout.open(data);
                return false;
            } else {
                BottomSheets.open(data);
            }

            return false;
        }
    });

});
