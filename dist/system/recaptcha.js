"use strict";

System.register(["aurelia-framework", "parse-duration", "./recaptcha-base"], function (_export, _context) {
  "use strict";

  var bindable, customElement, parseDuration, GR, RecaptchaBase, _dec, _class, _class2, _descriptor, _descriptor2, _temp, Recaptcha;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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
    _temp: void 0
  });

  return {
    setters: [function (_aureliaFramework) {
      bindable = _aureliaFramework.bindable;
      customElement = _aureliaFramework.customElement;
    }, function (_parseDuration) {
      parseDuration = _parseDuration.default;
    }, function (_recaptchaBase) {
      GR = _recaptchaBase.GR;
      RecaptchaBase = _recaptchaBase.RecaptchaBase;
    }],
    execute: function () {
      _export("Recaptcha", Recaptcha = (_dec = customElement('recaptcha'), _dec(_class = (_class2 = (_temp = function (_RecaptchaBase) {
        _inheritsLoose(Recaptcha, _RecaptchaBase);

        function Recaptcha() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _RecaptchaBase.call.apply(_RecaptchaBase, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "action", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "expires", _descriptor2, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = Recaptcha.prototype;

        _proto.bind = function bind() {
          _RecaptchaBase.prototype.bind && _RecaptchaBase.prototype.bind.call(this);

          if (!this.sitekey) {
            this.sitekey = this.config.get('siteKeys.v3');
          }

          this.loadScript(this.getScriptId(), "https://www.google.com/recaptcha/api.js?render=" + this.sitekey);
          this.registerExecuteEvent();
        };

        _proto.attached = function attached() {
          _RecaptchaBase.prototype.attached && _RecaptchaBase.prototype.attached.call(this);
          this.registerExecuteWatcher();
          this.registerExpireWatcher();
        };

        _proto.registerExpireWatcher = function registerExpireWatcher() {
          var _this2 = this;

          var eventName = "grecaptcha:expire:" + this.id;
          this.__watchers__[eventName] = setInterval(function () {
            if (_this2.lastCheck && new Date().getTime() - _this2.lastCheck.getTime() > _this2.parsedExpires) {
              _this2.value = null;
            }
          }, 1000);
        };

        _proto.recaptchaExecute = function recaptchaExecute() {
          var _this3 = this;

          if (typeof window[GR] === undefined || !grecaptcha.execute) {
            return;
          }

          grecaptcha.execute(this.sitekey, {
            action: this.action
          }).then(function (token) {
            _this3.value = token;
            _this3.lastCheck = new Date();
          });
        };

        _createClass(Recaptcha, [{
          key: "parsedExpires",
          get: function get() {
            return parseDuration(this.expires);
          }
        }]);

        return Recaptcha;
      }(RecaptchaBase), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "action", [bindable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 'homepage';
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "expires", [bindable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return '1m';
        }
      })), _class2)) || _class));
    }
  };
});