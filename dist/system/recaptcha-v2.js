"use strict";

System.register(["aurelia-framework", "./recaptcha-base"], function (_export, _context) {
  "use strict";

  var bindable, customElement, getHash, RecaptchaBase, _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _temp, scriptReady, callbackName, callbackPromise, RecaptchaVerified, RecaptchaError, RecaptchaExpired, RecaptchaV2;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and set to use loose mode. ' + 'To use proposal-class-properties in spec mode with decorators, wait for ' + 'the next major version of decorators in stage 2.'); }

  _export({
    _dec: void 0,
    _class: void 0,
    _class2: void 0,
    _descriptor: void 0,
    _descriptor2: void 0,
    _descriptor3: void 0,
    _descriptor4: void 0,
    _descriptor5: void 0,
    _descriptor6: void 0,
    _temp: void 0
  });

  return {
    setters: [function (_aureliaFramework) {
      bindable = _aureliaFramework.bindable;
      customElement = _aureliaFramework.customElement;
    }, function (_recaptchaBase) {
      getHash = _recaptchaBase.getHash;
      RecaptchaBase = _recaptchaBase.RecaptchaBase;
    }],
    execute: function () {
      scriptReady = false;
      callbackName = "__recaptcha_callback_" + getHash() + "__";
      callbackPromise = new Promise(function (resolve) {
        return window[callbackName] = function () {
          scriptReady = true;
          resolve();
        };
      });

      _export("RecaptchaVerified", RecaptchaVerified = function RecaptchaVerified(component, token, widgetId) {
        this.component = component;
        this.grecaptcha = grecaptcha;
        this.token = token;
        this.widgetId = widgetId;
      });

      _export("RecaptchaError", RecaptchaError = function RecaptchaError(component, widgetId) {
        this.component = component;
        this.grecaptcha = grecaptcha;
        this.widgetId = widgetId;
      });

      _export("RecaptchaExpired", RecaptchaExpired = function RecaptchaExpired(component, widgetId) {
        this.component = component;
        this.grecaptcha = grecaptcha;
        this.widgetId = widgetId;
      });

      _export("RecaptchaV2", RecaptchaV2 = (_dec = customElement('recaptcha-v2'), _dec(_class = (_class2 = (_temp = function (_RecaptchaBase) {
        _inheritsLoose(RecaptchaV2, _RecaptchaBase);

        function RecaptchaV2() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _RecaptchaBase.call.apply(_RecaptchaBase, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "callback", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "errorCallback", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "expiredCallback", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "size", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "tabindex", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "theme", _descriptor6, _assertThisInitialized(_this));

          _this.widgetId = null;
          return _this;
        }

        var _proto = RecaptchaV2.prototype;

        _proto.bind = function bind() {
          _RecaptchaBase.prototype.bind && _RecaptchaBase.prototype.bind.call(this);

          if (!this.sitekey) {
            this.sitekey = this.config.get('siteKeys.v2');
          }

          var lang = document.getElementsByTagName('html')[0].getAttribute('lang') || this.config.get('lang');
          var script = "https://www.google.com/recaptcha/api.js?onload=" + callbackName + "&render=explicit&hl=" + lang;
          this.loadScript(this.getScriptId(), script);
          this.registerResetEvent();
        };

        _proto.attached = function attached() {
          _RecaptchaBase.prototype.attached && _RecaptchaBase.prototype.attached.call(this);
          this.render();
        };

        _proto.registerResetEvent = function registerResetEvent() {
          var _this2 = this;

          var eventName = "grecaptcha:reset:" + this.id;
          this.__auevents__[eventName] = this.events.subscribe(eventName, function () {
            _this2.logger.debug("Triggered " + eventName);

            grecaptcha && grecaptcha.reset && grecaptcha.reset(_this2.widgetId);
            _this2.value = null;
          });
        };

        _proto.render = function render() {
          var _this3 = this;

          if (!scriptReady) {
            return callbackPromise.then(function () {
              return _this3.render();
            });
          }

          this.widgetId = grecaptcha.render(this.element, this.renderOptions());
        };

        _proto.renderOptions = function renderOptions() {
          var _this4 = this;

          var callback = function callback() {
            if (_this4.widgetId !== null) {
              _this4.value = grecaptcha.getResponse(_this4.widgetId);

              _this4.logger.debug('reCAPTCHA callback', _this4.widgetId, _this4.value);
            }

            if (_this4.callback) {
              if (typeof _this4.callback === 'function') {
                return _this4.callback(new RecaptchaVerified(_this4, _this4.value, _this4.widgetId));
              }

              if (window[_this4.callback]) {
                return window[_this4.callback].call(null, new RecaptchaVerified(_this4, _this4.value, _this4.widgetId));
              }
            }
          };

          var errorCallback = function errorCallback() {
            _this4.value = undefined;

            _this4.logger.debug('reCAPTCHA error-callback', _this4.widgetId);

            if (_this4.errorCallback) {
              if (typeof _this4.errorCallback === 'function') {
                return _this4.callback(new RecaptchaError(_this4, _this4.widgetId));
              }

              if (window[_this4.errorCallback]) {
                return window[_this4.errorCallback].call(null, new RecaptchaError(_this4, _this4.widgetId));
              }
            }
          };

          var expiredCallback = function expiredCallback() {
            _this4.value = undefined;

            _this4.logger.debug('reCAPTCHA expired-callback', _this4.widgetId);

            if (_this4.expiredCallback) {
              if (typeof _this4.expiredCallback === 'function') {
                return _this4.expiredCallback(new RecaptchaExpired(_this4, _this4.widgetId));
              }

              if (window[_this4.expiredCallback]) {
                return window[_this4.expiredCallback].call(null, new RecaptchaExpired(_this4, _this4.widgetId));
              }
            }
          };

          return {
            callback: callback,
            'error-callback': errorCallback,
            'expired-callback': expiredCallback,
            sitekey: this.sitekey,
            size: this.size,
            tabindex: this.tabindex,
            theme: this.theme,
            type: this.type
          };
        };

        return RecaptchaV2;
      }(RecaptchaBase), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "callback", [bindable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "errorCallback", [bindable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "expiredCallback", [bindable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "size", [bindable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 'normal';
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "tabindex", [bindable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "theme", [bindable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 'light';
        }
      })), _class2)) || _class));
    }
  };
});