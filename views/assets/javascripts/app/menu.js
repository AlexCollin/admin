$(function() {
  'use strict';

  $('.qor-menu-container')
    .on('click', '> ul > li > a', function() {
      let $this = $(this),
        $li = $this.parent(),
        $ul = $this.next('ul');

      if (!$ul.length) {
        return;
      }

      if ($ul.hasClass('in')) {
        $li.removeClass('is-expanded');
        $ul
          .one('transitionend', function() {
            $ul.removeClass('collapsing in');
          })
          .addClass('collapsing')
          .height(0);
      } else {
        $li.addClass('is-expanded');
        $ul
          .one('transitionend', function() {
            $ul.removeClass('collapsing');
          })
          .addClass('collapsing in')
          .height($ul.prop('scrollHeight'));
      }
    })
    .find('> ul > li > a')
    .each(function() {
      let $this = $(this),
        $li = $this.parent(),
        $ul = $this.next('ul');

      if (!$ul.length) {
        return;
      }

      $li.addClass('has-menu is-expanded');
      $ul.addClass('collapse in').height($ul.prop('scrollHeight'));
    });

  let $pageHeader = $('.qor-page > .qor-page__header'),
    $pageBody = $('.qor-page > .qor-page__body');

  if ($pageHeader.length) {
    if ($pageHeader.height() > 48) {
      $pageBody.css('padding-top', $pageHeader.height());
    }

    $('.qor-page').addClass('has-header');
    $('header.mdl-layout__header').addClass('has-action');
  }
});
