'use strict';

var util = require('./util.js');

var ProjectManagementPage = function () {
  this.settingsMenuLink = element(by.css('.hdrnav a.btn i.icon-cog'));
  this.projectManagementLink = element(by.linkText('Manage Project'));

  this.get = function get() {
    expect(this.settingsMenuLink.isDisplayed()).toBe(true);
    this.settingsMenuLink.click();
    this.projectManagementLink.click();
  };

  this.noticeList = element.all(by.repeater('notice in notices()'));
  this.firstNoticeCloseButton = this.noticeList.first().element(by.buttonText('×'));

  this.backButton = element(by.linkText('Back'));

  this.tabDivs = element.all(by.repeater('tab in tabs'));
  this.activePane = element(by.css('div.tab-pane.active'));

  this.tabs = {
    reports: element(by.linkText('Reports')),
    archive: element(by.linkText('Archive')),
    remove: element(by.linkText('Delete'))
  };

  //noinspection JSUnusedGlobalSymbols
  this.archiveTab = {
    archiveButton: this.activePane.element(by.buttonText('Archive this project'))
  };

  this.deleteTab = {
    deleteBoxText: this.activePane.element(by.model('deleteBoxText')),
    deleteButton: this.activePane.element(by.buttonText('Delete this project'))
  };

  this.settings = {};
  this.settings.button = element(by.css('a.btn i.icon-cog'));
  this.settings.projectSettingsLink = element(by.linkText('Project Settings'));
  this.settings.tabs = {
    projectProperties: element(by.linkText('Project Properties'))
  };
  this.settings.projectPropertiesTab = {
    projectOwner: element(by.binding('project.ownerRef.username'))
  };

  this.expectConsoleError = function () {
    browser.manage().logs().get('browser').then(function (browserLog) {
      if (browserLog.length > 1) {
        for (var i = 0; i < browserLog.length; i++) {
          var message = browserLog[i].message;
          if (message.indexOf('\n') != -1) {

            // place CR between lines
            message = message.split('\n').join('\n');
          }

          if (/angular\.js .* TypeError: undefined is not a function/.test(message) ||
            /angular.*\.js .* Error: \[\$compile:tpload]/.test(message) ||
            /"level":"info"/.test(message) ||
            /next_id/.test(message)
          ) {
            // we ignore errors of this type caused by Angular being unloaded prematurely on page
            // refreshes (since it's not a real error)
            continue;
          } else if (/You don't have sufficient privileges\./.test(message)) {
            // this is the console error we expected
            continue;
          }

          message = '\n\nBrowser Console JS Error: \n' + message + '\n\n';
          expect(message).toEqual(''); // fail the test
        }
      } else {
        expect(browserLog.length).toEqual(1);
      }
    });
  };

};

module.exports = new ProjectManagementPage();
