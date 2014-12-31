'use strict';

function ConfigurationPage() {
  var modal = require('./lexModals.js');
  var _this = this;

  this.noticeList = element.all(by.repeater('notice in notices()'));
  
  this.settingsMenuLink = element(by.css('.hdrnav a.btn i.icon-cog'));
  this.configurationLink = element(by.linkText('Dictionary Configuration'));
  this.get = function get() {
    this.settingsMenuLink.click();
    this.configurationLink.click();
  };

  this.applyButton = element(by.buttonText('Apply'));

  this.tabDivs = element.all(by.repeater('tab in tabs'));
  
  this.activePane = element(by.css('div.tab-pane.active'));

  this.getTabByName = function getTabByName(tabName) {
    return element(by.css('div.tabbable ul.nav-tabs')).element(by.cssContainingText('a', tabName));
  };

  this.tabs = {
    inputSystems: element(by.linkText('Input Systems')),
    fields:       element(by.linkText('Fields')),
    tasks:        element(by.linkText('Tasks')),
    optionlists:  element(by.linkText('Option Lists'))
  };
  
  this.inputSystemsTab = {
    newButton:    this.tabDivs.first().element(by.partialButtonText('New')),
    moreButton:   this.tabDivs.first().element(by.css('.btn-group a.btn')),
    moreButtonGroup: {
      addIpa:     this.tabDivs.first().element(by.partialLinkText('Add IPA')),
      addVoice:   this.tabDivs.first().element(by.partialLinkText('Add Voice')),
      addVariant: this.tabDivs.first().element(by.partialLinkText('Add a variant')),
      remove:     this.tabDivs.first().element(by.css('i.icon-remove'))
    },
    getLanguageByName: function getLanguageByName(languageName) {
      return element(by.css('div.tab-pane.active div.span3 dl.picklists')).element(by.cssContainingText('div[data-ng-repeat] span', languageName));
    },
    selectedInputSystem: {
      displayName:    this.tabDivs.first().element(by.id('languageDisplayName')),
      tag:            this.tabDivs.first().element(by.binding('inputSystemViewModels[currentInputSystemTag].inputSystem.tag')),
      abbreviationInput: this.tabDivs.first().element(by.model('inputSystemViewModels[currentInputSystemTag].inputSystem.abbreviation')),
      rightToLeftCheckbox: this.tabDivs.first().element(by.model('inputSystemViewModels[currentInputSystemTag].inputSystem.isRightToLeft')),
      specialDropdown: this.tabDivs.first().element(by.id('special')),
      purposeDropdown: this.tabDivs.first().element(by.id('purpose')),
      ipaVariantInput: this.tabDivs.first().element(by.id('ipaVariant')),
      voiceVariantInput: this.tabDivs.first().element(by.id('voiceVariant')),
      scriptDropdown: this.tabDivs.first().element(by.id('script')),
      regionDropdown: this.tabDivs.first().element(by.id('region')),
      variantInput:   this.tabDivs.first().element(by.id('variant'))
    }
  };
  
  this.showAllFieldsButton = element(by.buttonText('Show All Fields'));
  this.showCommonFieldsButton = element(by.buttonText('Show Only Common Fields'));

  this.entryFields = this.activePane.all(by.repeater('fieldName in fieldOrder.entry'));
  this.senseFields = this.activePane.all(by.repeater('fieldName in fieldOrder.senses'));
  this.exampleFields = this.activePane.all(by.repeater('fieldName in fieldOrder.examples'));

  this.getFieldByName = function getFieldByName(fieldName) {
    return element(by.css('div.tab-pane.active > div > div > div.span3 dl.picklists')).element(by.cssContainingText('div[data-ng-repeat] span', fieldName));
  };

  this.hiddenIfEmpty = this.activePane.element(by.id('hideIfEmpty'));
  this.captionHiddenIfEmpty = function() {
    return this.activePane.element(by.id('captionHideIfEmpty'));
  }; 

  // select language modal
  this.modal = modal;
  
};

module.exports = new ConfigurationPage();
