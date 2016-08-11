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
            openData = $this.data(),
            actionSelectedData;

        if ($(e.target).hasClass("material-icons") || (!$(e.target).data('url') && $(e.target).is('a'))) {
            return;
        }

        if (isActionButton) {
            actionSelectedData = collectSelectID();
            openData = $.extend({}, openData, {
              actionSelectedData: actionSelectedData
            });
        }

        if (!openData.method || openData.method.toUpperCase() == "GET") {
            // Slideout or New Page: table items, new button, edit button
            if (isInTable || isNewButton || isEditButton || openData.openType == 'slideout') {
                if (hasSlideoutTheme) {
                    if ($this.hasClass(CLASS_IS_SELECTED)) {
                        Slideout.hide();
                        clearSelectedCss();
                        return false;
                    } else {
                        Slideout.open(openData);
                        toggleSelectedCss($this);
                        return false;
                    }
                } else {
                    window.location = openData('url');
                }
                return;
            }

            // Open in BottmSheet: slideout is opened or openType is Bottom Sheet
            if (isSlideoutOpened() || isActionButton || openData.openType == 'bottom-sheet') {
                BottomSheets.open(openData);
                return false;
            }

            // Other clicks
            if (hasSlideoutTheme) {
                Slideout.open(openData);
                return false;
            } else {
                BottomSheets.open(openData);
                return false;
            }

            return false;
        }
    });

});
