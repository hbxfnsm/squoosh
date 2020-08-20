var mozjpeg_enc = (function () {
  var _scriptDir =
    typeof document !== 'undefined' && document.currentScript
      ? document.currentScript.src
      : undefined;
  if (typeof __filename !== 'undefined') _scriptDir = _scriptDir || __filename;
  return function (mozjpeg_enc) {
    mozjpeg_enc = mozjpeg_enc || {};

    var c;
    c || (c = typeof mozjpeg_enc !== 'undefined' ? mozjpeg_enc : {});
    var r = {},
      t;
    for (t in c) c.hasOwnProperty(t) && (r[t] = c[t]);
    var aa = './this.program';
    function u(a, b) {
      throw b;
    }
    var ba = !1,
      v = !1,
      ca = !1,
      da = !1;
    ba = 'object' === typeof window;
    v = 'function' === typeof importScripts;
    ca =
      'object' === typeof process &&
      'object' === typeof process.versions &&
      'string' === typeof process.versions.node;
    da = !ba && !ca && !v;
    var w = '',
      ea,
      x,
      fa,
      ha;
    if (ca)
      (w = v ? require('path').dirname(w) + '/' : __dirname + '/'),
        (ea = function (a, b) {
          fa || (fa = require('fs'));
          ha || (ha = require('path'));
          a = ha.normalize(a);
          return fa.readFileSync(a, b ? null : 'utf8');
        }),
        (x = function (a) {
          a = ea(a, !0);
          a.buffer || (a = new Uint8Array(a));
          a.buffer || A('Assertion failed: undefined');
          return a;
        }),
        1 < process.argv.length && (aa = process.argv[1].replace(/\\/g, '/')),
        process.argv.slice(2),
        process.on('uncaughtException', function (a) {
          if (!(a instanceof ia)) throw a;
        }),
        process.on('unhandledRejection', A),
        (u = function (a) {
          process.exit(a);
        }),
        (c.inspect = function () {
          return '[Emscripten Module object]';
        });
    else if (da)
      'undefined' != typeof read &&
        (ea = function (a) {
          return read(a);
        }),
        (x = function (a) {
          if ('function' === typeof readbuffer)
            return new Uint8Array(readbuffer(a));
          a = read(a, 'binary');
          'object' === typeof a || A('Assertion failed: undefined');
          return a;
        }),
        'function' === typeof quit &&
          (u = function (a) {
            quit(a);
          }),
        'undefined' !== typeof print &&
          ('undefined' === typeof console && (console = {}),
          (console.log = print),
          (console.warn = console.error =
            'undefined' !== typeof printErr ? printErr : print));
    else if (ba || v)
      v
        ? (w = self.location.href)
        : document.currentScript && (w = document.currentScript.src),
        _scriptDir && (w = _scriptDir),
        0 !== w.indexOf('blob:')
          ? (w = w.substr(0, w.lastIndexOf('/') + 1))
          : (w = ''),
        (ea = function (a) {
          var b = new XMLHttpRequest();
          b.open('GET', a, !1);
          b.send(null);
          return b.responseText;
        }),
        v &&
          (x = function (a) {
            var b = new XMLHttpRequest();
            b.open('GET', a, !1);
            b.responseType = 'arraybuffer';
            b.send(null);
            return new Uint8Array(b.response);
          });
    var ja = c.print || console.log.bind(console),
      B = c.printErr || console.warn.bind(console);
    for (t in r) r.hasOwnProperty(t) && (c[t] = r[t]);
    r = null;
    c.thisProgram && (aa = c.thisProgram);
    c.quit && (u = c.quit);
    var C;
    c.wasmBinary && (C = c.wasmBinary);
    var noExitRuntime;
    c.noExitRuntime && (noExitRuntime = c.noExitRuntime);
    'object' !== typeof WebAssembly && B('no native wasm support detected');
    var F,
      ka = new WebAssembly.Table({
        initial: 130,
        maximum: 130,
        element: 'anyfunc',
      }),
      la = !1,
      ma =
        'undefined' !== typeof TextDecoder ? new TextDecoder('utf8') : void 0;
    function na(a, b, d) {
      var e = b + d;
      for (d = b; a[d] && !(d >= e); ) ++d;
      if (16 < d - b && a.subarray && ma) return ma.decode(a.subarray(b, d));
      for (e = ''; b < d; ) {
        var f = a[b++];
        if (f & 128) {
          var g = a[b++] & 63;
          if (192 == (f & 224)) e += String.fromCharCode(((f & 31) << 6) | g);
          else {
            var m = a[b++] & 63;
            f =
              224 == (f & 240)
                ? ((f & 15) << 12) | (g << 6) | m
                : ((f & 7) << 18) | (g << 12) | (m << 6) | (a[b++] & 63);
            65536 > f
              ? (e += String.fromCharCode(f))
              : ((f -= 65536),
                (e += String.fromCharCode(
                  55296 | (f >> 10),
                  56320 | (f & 1023),
                )));
          }
        } else e += String.fromCharCode(f);
      }
      return e;
    }
    function oa(a, b, d) {
      var e = H;
      if (0 < d) {
        d = b + d - 1;
        for (var f = 0; f < a.length; ++f) {
          var g = a.charCodeAt(f);
          if (55296 <= g && 57343 >= g) {
            var m = a.charCodeAt(++f);
            g = (65536 + ((g & 1023) << 10)) | (m & 1023);
          }
          if (127 >= g) {
            if (b >= d) break;
            e[b++] = g;
          } else {
            if (2047 >= g) {
              if (b + 1 >= d) break;
              e[b++] = 192 | (g >> 6);
            } else {
              if (65535 >= g) {
                if (b + 2 >= d) break;
                e[b++] = 224 | (g >> 12);
              } else {
                if (b + 3 >= d) break;
                e[b++] = 240 | (g >> 18);
                e[b++] = 128 | ((g >> 12) & 63);
              }
              e[b++] = 128 | ((g >> 6) & 63);
            }
            e[b++] = 128 | (g & 63);
          }
        }
        e[b] = 0;
      }
    }
    var pa =
      'undefined' !== typeof TextDecoder ? new TextDecoder('utf-16le') : void 0;
    function qa(a) {
      var b;
      for (b = a >> 1; I[b]; ) ++b;
      b <<= 1;
      if (32 < b - a && pa) return pa.decode(H.subarray(a, b));
      b = 0;
      for (var d = ''; ; ) {
        var e = I[(a + 2 * b) >> 1];
        if (0 == e) return d;
        ++b;
        d += String.fromCharCode(e);
      }
    }
    function ra(a, b, d) {
      void 0 === d && (d = 2147483647);
      if (2 > d) return 0;
      d -= 2;
      var e = b;
      d = d < 2 * a.length ? d / 2 : a.length;
      for (var f = 0; f < d; ++f) (I[b >> 1] = a.charCodeAt(f)), (b += 2);
      I[b >> 1] = 0;
      return b - e;
    }
    function sa(a) {
      return 2 * a.length;
    }
    function ta(a) {
      for (var b = 0, d = ''; ; ) {
        var e = J[(a + 4 * b) >> 2];
        if (0 == e) return d;
        ++b;
        65536 <= e
          ? ((e -= 65536),
            (d += String.fromCharCode(55296 | (e >> 10), 56320 | (e & 1023))))
          : (d += String.fromCharCode(e));
      }
    }
    function ua(a, b, d) {
      void 0 === d && (d = 2147483647);
      if (4 > d) return 0;
      var e = b;
      d = e + d - 4;
      for (var f = 0; f < a.length; ++f) {
        var g = a.charCodeAt(f);
        if (55296 <= g && 57343 >= g) {
          var m = a.charCodeAt(++f);
          g = (65536 + ((g & 1023) << 10)) | (m & 1023);
        }
        J[b >> 2] = g;
        b += 4;
        if (b + 4 > d) break;
      }
      J[b >> 2] = 0;
      return b - e;
    }
    function va(a) {
      for (var b = 0, d = 0; d < a.length; ++d) {
        var e = a.charCodeAt(d);
        55296 <= e && 57343 >= e && ++d;
        b += 4;
      }
      return b;
    }
    var K, L, H, I, wa, J, M, xa, ya;
    function za(a) {
      K = a;
      c.HEAP8 = L = new Int8Array(a);
      c.HEAP16 = I = new Int16Array(a);
      c.HEAP32 = J = new Int32Array(a);
      c.HEAPU8 = H = new Uint8Array(a);
      c.HEAPU16 = wa = new Uint16Array(a);
      c.HEAPU32 = M = new Uint32Array(a);
      c.HEAPF32 = xa = new Float32Array(a);
      c.HEAPF64 = ya = new Float64Array(a);
    }
    var Aa = c.INITIAL_MEMORY || 16777216;
    c.wasmMemory
      ? (F = c.wasmMemory)
      : (F = new WebAssembly.Memory({ initial: Aa / 65536 }));
    F && (K = F.buffer);
    Aa = K.byteLength;
    za(K);
    J[23104] = 5335456;
    function Ba(a) {
      for (; 0 < a.length; ) {
        var b = a.shift();
        if ('function' == typeof b) b();
        else {
          var d = b.ea;
          'number' === typeof d
            ? void 0 === b.Y
              ? c.dynCall_v(d)
              : c.dynCall_vi(d, b.Y)
            : d(void 0 === b.Y ? null : b.Y);
        }
      }
    }
    var Ca = [],
      Da = [],
      Ea = [],
      Fa = [];
    function Ga() {
      var a = c.preRun.shift();
      Ca.unshift(a);
    }
    var N = 0,
      Ha = null,
      O = null;
    c.preloadedImages = {};
    c.preloadedAudios = {};
    function A(a) {
      if (c.onAbort) c.onAbort(a);
      ja(a);
      B(a);
      la = !0;
      throw new WebAssembly.RuntimeError(
        'abort(' + a + '). Build with -s ASSERTIONS=1 for more info.',
      );
    }
    function Ia() {
      var a = P;
      return String.prototype.startsWith
        ? a.startsWith('data:application/octet-stream;base64,')
        : 0 === a.indexOf('data:application/octet-stream;base64,');
    }
    var P = 'mozjpeg_enc.wasm';
    if (!Ia()) {
      var Ja = P;
      P = c.locateFile ? c.locateFile(Ja, w) : w + Ja;
    }
    function Ka() {
      try {
        if (C) return new Uint8Array(C);
        if (x) return x(P);
        throw 'both async and sync fetching of the wasm failed';
      } catch (a) {
        A(a);
      }
    }
    function La() {
      return C || (!ba && !v) || 'function' !== typeof fetch
        ? new Promise(function (a) {
            a(Ka());
          })
        : fetch(P, { credentials: 'same-origin' })
            .then(function (a) {
              if (!a.ok) throw "failed to load wasm binary file at '" + P + "'";
              return a.arrayBuffer();
            })
            .catch(function () {
              return Ka();
            });
    }
    Da.push({
      ea: function () {
        Ma();
      },
    });
    function Na() {
      return 0 < Na.$;
    }
    var Oa = {};
    function Pa(a) {
      for (; a.length; ) {
        var b = a.pop();
        a.pop()(b);
      }
    }
    function Qa(a) {
      return this.fromWireType(M[a >> 2]);
    }
    var Q = {},
      R = {},
      Ra = {};
    function Sa(a) {
      if (void 0 === a) return '_unknown';
      a = a.replace(/[^a-zA-Z0-9_]/g, '$');
      var b = a.charCodeAt(0);
      return 48 <= b && 57 >= b ? '_' + a : a;
    }
    function Ta(a, b) {
      a = Sa(a);
      return new Function(
        'body',
        'return function ' +
          a +
          '() {\n    "use strict";    return body.apply(this, arguments);\n};\n',
      )(b);
    }
    function Ua(a) {
      var b = Error,
        d = Ta(a, function (e) {
          this.name = a;
          this.message = e;
          e = Error(e).stack;
          void 0 !== e &&
            (this.stack =
              this.toString() + '\n' + e.replace(/^Error(:[^\n]*)?\n/, ''));
        });
      d.prototype = Object.create(b.prototype);
      d.prototype.constructor = d;
      d.prototype.toString = function () {
        return void 0 === this.message
          ? this.name
          : this.name + ': ' + this.message;
      };
      return d;
    }
    var Va = void 0;
    function Wa(a, b, d) {
      function e(h) {
        h = d(h);
        if (h.length !== a.length)
          throw new Va('Mismatched type converter count');
        for (var k = 0; k < a.length; ++k) S(a[k], h[k]);
      }
      a.forEach(function (h) {
        Ra[h] = b;
      });
      var f = Array(b.length),
        g = [],
        m = 0;
      b.forEach(function (h, k) {
        R.hasOwnProperty(h)
          ? (f[k] = R[h])
          : (g.push(h),
            Q.hasOwnProperty(h) || (Q[h] = []),
            Q[h].push(function () {
              f[k] = R[h];
              ++m;
              m === g.length && e(f);
            }));
      });
      0 === g.length && e(f);
    }
    function Xa(a) {
      switch (a) {
        case 1:
          return 0;
        case 2:
          return 1;
        case 4:
          return 2;
        case 8:
          return 3;
        default:
          throw new TypeError('Unknown type size: ' + a);
      }
    }
    var Ya = void 0;
    function T(a) {
      for (var b = ''; H[a]; ) b += Ya[H[a++]];
      return b;
    }
    var Za = void 0;
    function U(a) {
      throw new Za(a);
    }
    function S(a, b, d) {
      d = d || {};
      if (!('argPackAdvance' in b))
        throw new TypeError(
          'registerType registeredInstance requires argPackAdvance',
        );
      var e = b.name;
      a || U('type "' + e + '" must have a positive integer typeid pointer');
      if (R.hasOwnProperty(a)) {
        if (d.ia) return;
        U("Cannot register type '" + e + "' twice");
      }
      R[a] = b;
      delete Ra[a];
      Q.hasOwnProperty(a) &&
        ((b = Q[a]),
        delete Q[a],
        b.forEach(function (f) {
          f();
        }));
    }
    var $a = [],
      V = [
        {},
        { value: void 0 },
        { value: null },
        { value: !0 },
        { value: !1 },
      ];
    function ab(a) {
      4 < a && 0 === --V[a].Z && ((V[a] = void 0), $a.push(a));
    }
    function bb(a) {
      switch (a) {
        case void 0:
          return 1;
        case null:
          return 2;
        case !0:
          return 3;
        case !1:
          return 4;
        default:
          var b = $a.length ? $a.pop() : V.length;
          V[b] = { Z: 1, value: a };
          return b;
      }
    }
    function cb(a) {
      if (null === a) return 'null';
      var b = typeof a;
      return 'object' === b || 'array' === b || 'function' === b
        ? a.toString()
        : '' + a;
    }
    function db(a, b) {
      switch (b) {
        case 2:
          return function (d) {
            return this.fromWireType(xa[d >> 2]);
          };
        case 3:
          return function (d) {
            return this.fromWireType(ya[d >> 3]);
          };
        default:
          throw new TypeError('Unknown float type: ' + a);
      }
    }
    function eb(a) {
      var b = Function;
      if (!(b instanceof Function))
        throw new TypeError(
          'new_ called with constructor type ' +
            typeof b +
            ' which is not a function',
        );
      var d = Ta(b.name || 'unknownFunctionName', function () {});
      d.prototype = b.prototype;
      d = new d();
      a = b.apply(d, a);
      return a instanceof Object ? a : d;
    }
    function fb(a, b) {
      var d = c;
      if (void 0 === d[a].W) {
        var e = d[a];
        d[a] = function () {
          d[a].W.hasOwnProperty(arguments.length) ||
            U(
              "Function '" +
                b +
                "' called with an invalid number of arguments (" +
                arguments.length +
                ') - expects one of (' +
                d[a].W +
                ')!',
            );
          return d[a].W[arguments.length].apply(this, arguments);
        };
        d[a].W = [];
        d[a].W[e.ba] = e;
      }
    }
    function gb(a, b, d) {
      c.hasOwnProperty(a)
        ? ((void 0 === d || (void 0 !== c[a].W && void 0 !== c[a].W[d])) &&
            U("Cannot register public name '" + a + "' twice"),
          fb(a, a),
          c.hasOwnProperty(d) &&
            U(
              'Cannot register multiple overloads of a function with the same number of arguments (' +
                d +
                ')!',
            ),
          (c[a].W[d] = b))
        : ((c[a] = b), void 0 !== d && (c[a].pa = d));
    }
    function hb(a, b) {
      for (var d = [], e = 0; e < a; e++) d.push(J[(b >> 2) + e]);
      return d;
    }
    function W(a, b) {
      a = T(a);
      var d = c['dynCall_' + a];
      for (var e = [], f = 1; f < a.length; ++f) e.push('a' + f);
      f =
        'return function dynCall_' +
        (a + '_' + b) +
        '(' +
        e.join(', ') +
        ') {\n';
      f +=
        '    return dynCall(rawFunction' +
        (e.length ? ', ' : '') +
        e.join(', ') +
        ');\n';
      d = new Function('dynCall', 'rawFunction', f + '};\n')(d, b);
      'function' !== typeof d &&
        U('unknown function pointer with signature ' + a + ': ' + b);
      return d;
    }
    var ib = void 0;
    function jb(a) {
      a = kb(a);
      var b = T(a);
      Y(a);
      return b;
    }
    function lb(a, b) {
      function d(g) {
        f[g] || R[g] || (Ra[g] ? Ra[g].forEach(d) : (e.push(g), (f[g] = !0)));
      }
      var e = [],
        f = {};
      b.forEach(d);
      throw new ib(a + ': ' + e.map(jb).join([', ']));
    }
    function mb(a, b, d) {
      switch (b) {
        case 0:
          return d
            ? function (e) {
                return L[e];
              }
            : function (e) {
                return H[e];
              };
        case 1:
          return d
            ? function (e) {
                return I[e >> 1];
              }
            : function (e) {
                return wa[e >> 1];
              };
        case 2:
          return d
            ? function (e) {
                return J[e >> 2];
              }
            : function (e) {
                return M[e >> 2];
              };
        default:
          throw new TypeError('Unknown integer type: ' + a);
      }
    }
    var nb = {};
    function ob() {
      if (!pb) {
        var a = {
            USER: 'web_user',
            LOGNAME: 'web_user',
            PATH: '/',
            PWD: '/',
            HOME: '/home/web_user',
            LANG:
              (
                ('object' === typeof navigator &&
                  navigator.languages &&
                  navigator.languages[0]) ||
                'C'
              ).replace('-', '_') + '.UTF-8',
            _: aa || './this.program',
          },
          b;
        for (b in nb) a[b] = nb[b];
        var d = [];
        for (b in a) d.push(b + '=' + a[b]);
        pb = d;
      }
      return pb;
    }
    var pb,
      qb = [null, [], []];
    Va = c.InternalError = Ua('InternalError');
    for (var rb = Array(256), sb = 0; 256 > sb; ++sb)
      rb[sb] = String.fromCharCode(sb);
    Ya = rb;
    Za = c.BindingError = Ua('BindingError');
    c.count_emval_handles = function () {
      for (var a = 0, b = 5; b < V.length; ++b) void 0 !== V[b] && ++a;
      return a;
    };
    c.get_first_emval = function () {
      for (var a = 5; a < V.length; ++a) if (void 0 !== V[a]) return V[a];
      return null;
    };
    ib = c.UnboundTypeError = Ua('UnboundTypeError');
    var ub = {
        m: function (a) {
          return tb(a);
        },
        l: function (a) {
          'uncaught_exception' in Na ? Na.$++ : (Na.$ = 1);
          throw a;
        },
        r: function (a) {
          var b = Oa[a];
          delete Oa[a];
          var d = b.ja,
            e = b.ka,
            f = b.aa,
            g = f
              .map(function (m) {
                return m.ha;
              })
              .concat(
                f.map(function (m) {
                  return m.ma;
                }),
              );
          Wa([a], g, function (m) {
            var h = {};
            f.forEach(function (k, l) {
              var n = m[l],
                q = k.fa,
                D = k.ga,
                y = m[l + f.length],
                p = k.la,
                E = k.na;
              h[k.da] = {
                read: function (z) {
                  return n.fromWireType(q(D, z));
                },
                write: function (z, G) {
                  var X = [];
                  p(E, z, y.toWireType(X, G));
                  Pa(X);
                },
              };
            });
            return [
              {
                name: b.name,
                fromWireType: function (k) {
                  var l = {},
                    n;
                  for (n in h) l[n] = h[n].read(k);
                  e(k);
                  return l;
                },
                toWireType: function (k, l) {
                  for (var n in h)
                    if (!(n in l)) throw new TypeError('Missing field');
                  var q = d();
                  for (n in h) h[n].write(q, l[n]);
                  null !== k && k.push(e, q);
                  return q;
                },
                argPackAdvance: 8,
                readValueFromPointer: Qa,
                X: e,
              },
            ];
          });
        },
        t: function (a, b, d, e, f) {
          var g = Xa(d);
          b = T(b);
          S(a, {
            name: b,
            fromWireType: function (m) {
              return !!m;
            },
            toWireType: function (m, h) {
              return h ? e : f;
            },
            argPackAdvance: 8,
            readValueFromPointer: function (m) {
              if (1 === d) var h = L;
              else if (2 === d) h = I;
              else if (4 === d) h = J;
              else throw new TypeError('Unknown boolean type size: ' + b);
              return this.fromWireType(h[m >> g]);
            },
            X: null,
          });
        },
        s: function (a, b) {
          b = T(b);
          S(a, {
            name: b,
            fromWireType: function (d) {
              var e = V[d].value;
              ab(d);
              return e;
            },
            toWireType: function (d, e) {
              return bb(e);
            },
            argPackAdvance: 8,
            readValueFromPointer: Qa,
            X: null,
          });
        },
        g: function (a, b, d) {
          d = Xa(d);
          b = T(b);
          S(a, {
            name: b,
            fromWireType: function (e) {
              return e;
            },
            toWireType: function (e, f) {
              if ('number' !== typeof f && 'boolean' !== typeof f)
                throw new TypeError(
                  'Cannot convert "' + cb(f) + '" to ' + this.name,
                );
              return f;
            },
            argPackAdvance: 8,
            readValueFromPointer: db(b, d),
            X: null,
          });
        },
        d: function (a, b, d, e, f, g) {
          var m = hb(b, d);
          a = T(a);
          f = W(e, f);
          gb(
            a,
            function () {
              lb('Cannot call ' + a + ' due to unbound types', m);
            },
            b - 1,
          );
          Wa([], m, function (h) {
            var k = [h[0], null].concat(h.slice(1)),
              l = (h = a),
              n = f,
              q = k.length;
            2 > q &&
              U(
                "argTypes array size mismatch! Must at least get return value and 'this' types!",
              );
            for (var D = null !== k[1] && !1, y = !1, p = 1; p < k.length; ++p)
              if (null !== k[p] && void 0 === k[p].X) {
                y = !0;
                break;
              }
            var E = 'void' !== k[0].name,
              z = '',
              G = '';
            for (p = 0; p < q - 2; ++p)
              (z += (0 !== p ? ', ' : '') + 'arg' + p),
                (G += (0 !== p ? ', ' : '') + 'arg' + p + 'Wired');
            l =
              'return function ' +
              Sa(l) +
              '(' +
              z +
              ') {\nif (arguments.length !== ' +
              (q - 2) +
              ") {\nthrowBindingError('function " +
              l +
              " called with ' + arguments.length + ' arguments, expected " +
              (q - 2) +
              " args!');\n}\n";
            y && (l += 'var destructors = [];\n');
            var X = y ? 'destructors' : 'null';
            z = 'throwBindingError invoker fn runDestructors retType classParam'.split(
              ' ',
            );
            n = [U, n, g, Pa, k[0], k[1]];
            D &&
              (l +=
                'var thisWired = classParam.toWireType(' + X + ', this);\n');
            for (p = 0; p < q - 2; ++p)
              (l +=
                'var arg' +
                p +
                'Wired = argType' +
                p +
                '.toWireType(' +
                X +
                ', arg' +
                p +
                '); // ' +
                k[p + 2].name +
                '\n'),
                z.push('argType' + p),
                n.push(k[p + 2]);
            D && (G = 'thisWired' + (0 < G.length ? ', ' : '') + G);
            l +=
              (E ? 'var rv = ' : '') +
              'invoker(fn' +
              (0 < G.length ? ', ' : '') +
              G +
              ');\n';
            if (y) l += 'runDestructors(destructors);\n';
            else
              for (p = D ? 1 : 2; p < k.length; ++p)
                (q = 1 === p ? 'thisWired' : 'arg' + (p - 2) + 'Wired'),
                  null !== k[p].X &&
                    ((l += q + '_dtor(' + q + '); // ' + k[p].name + '\n'),
                    z.push(q + '_dtor'),
                    n.push(k[p].X));
            E && (l += 'var ret = retType.fromWireType(rv);\nreturn ret;\n');
            z.push(l + '}\n');
            k = eb(z).apply(null, n);
            p = b - 1;
            if (!c.hasOwnProperty(h))
              throw new Va('Replacing nonexistant public symbol');
            void 0 !== c[h].W && void 0 !== p
              ? (c[h].W[p] = k)
              : ((c[h] = k), (c[h].ba = p));
            return [];
          });
        },
        b: function (a, b, d, e, f) {
          function g(l) {
            return l;
          }
          b = T(b);
          -1 === f && (f = 4294967295);
          var m = Xa(d);
          if (0 === e) {
            var h = 32 - 8 * d;
            g = function (l) {
              return (l << h) >>> h;
            };
          }
          var k = -1 != b.indexOf('unsigned');
          S(a, {
            name: b,
            fromWireType: g,
            toWireType: function (l, n) {
              if ('number' !== typeof n && 'boolean' !== typeof n)
                throw new TypeError(
                  'Cannot convert "' + cb(n) + '" to ' + this.name,
                );
              if (n < e || n > f)
                throw new TypeError(
                  'Passing a number "' +
                    cb(n) +
                    '" from JS side to C/C++ side to an argument of type "' +
                    b +
                    '", which is outside the valid range [' +
                    e +
                    ', ' +
                    f +
                    ']!',
                );
              return k ? n >>> 0 : n | 0;
            },
            argPackAdvance: 8,
            readValueFromPointer: mb(b, m, 0 !== e),
            X: null,
          });
        },
        a: function (a, b, d) {
          function e(g) {
            g >>= 2;
            var m = M;
            return new f(K, m[g + 1], m[g]);
          }
          var f = [
            Int8Array,
            Uint8Array,
            Int16Array,
            Uint16Array,
            Int32Array,
            Uint32Array,
            Float32Array,
            Float64Array,
          ][b];
          d = T(d);
          S(
            a,
            {
              name: d,
              fromWireType: e,
              argPackAdvance: 8,
              readValueFromPointer: e,
            },
            { ia: !0 },
          );
        },
        h: function (a, b) {
          b = T(b);
          var d = 'std::string' === b;
          S(a, {
            name: b,
            fromWireType: function (e) {
              var f = M[e >> 2];
              if (d) {
                var g = H[e + 4 + f],
                  m = 0;
                0 != g && ((m = g), (H[e + 4 + f] = 0));
                var h = e + 4;
                for (g = 0; g <= f; ++g) {
                  var k = e + 4 + g;
                  if (0 == H[k]) {
                    h = h ? na(H, h, void 0) : '';
                    if (void 0 === l) var l = h;
                    else (l += String.fromCharCode(0)), (l += h);
                    h = k + 1;
                  }
                }
                0 != m && (H[e + 4 + f] = m);
              } else {
                l = Array(f);
                for (g = 0; g < f; ++g)
                  l[g] = String.fromCharCode(H[e + 4 + g]);
                l = l.join('');
              }
              Y(e);
              return l;
            },
            toWireType: function (e, f) {
              f instanceof ArrayBuffer && (f = new Uint8Array(f));
              var g = 'string' === typeof f;
              g ||
                f instanceof Uint8Array ||
                f instanceof Uint8ClampedArray ||
                f instanceof Int8Array ||
                U('Cannot pass non-string to std::string');
              var m = (d && g
                  ? function () {
                      for (var l = 0, n = 0; n < f.length; ++n) {
                        var q = f.charCodeAt(n);
                        55296 <= q &&
                          57343 >= q &&
                          (q =
                            (65536 + ((q & 1023) << 10)) |
                            (f.charCodeAt(++n) & 1023));
                        127 >= q
                          ? ++l
                          : (l =
                              2047 >= q ? l + 2 : 65535 >= q ? l + 3 : l + 4);
                      }
                      return l;
                    }
                  : function () {
                      return f.length;
                    })(),
                h = tb(4 + m + 1);
              M[h >> 2] = m;
              if (d && g) oa(f, h + 4, m + 1);
              else if (g)
                for (g = 0; g < m; ++g) {
                  var k = f.charCodeAt(g);
                  255 < k &&
                    (Y(h),
                    U(
                      'String has UTF-16 code units that do not fit in 8 bits',
                    ));
                  H[h + 4 + g] = k;
                }
              else for (g = 0; g < m; ++g) H[h + 4 + g] = f[g];
              null !== e && e.push(Y, h);
              return h;
            },
            argPackAdvance: 8,
            readValueFromPointer: Qa,
            X: function (e) {
              Y(e);
            },
          });
        },
        e: function (a, b, d) {
          d = T(d);
          if (2 === b) {
            var e = qa;
            var f = ra;
            var g = sa;
            var m = function () {
              return wa;
            };
            var h = 1;
          } else
            4 === b &&
              ((e = ta),
              (f = ua),
              (g = va),
              (m = function () {
                return M;
              }),
              (h = 2));
          S(a, {
            name: d,
            fromWireType: function (k) {
              var l = M[k >> 2],
                n = m(),
                q = n[(k + 4 + l * b) >> h],
                D = 0;
              0 != q && ((D = q), (n[(k + 4 + l * b) >> h] = 0));
              var y = k + 4;
              for (q = 0; q <= l; ++q) {
                var p = k + 4 + q * b;
                if (0 == n[p >> h]) {
                  y = e(y);
                  if (void 0 === E) var E = y;
                  else (E += String.fromCharCode(0)), (E += y);
                  y = p + b;
                }
              }
              0 != D && (n[(k + 4 + l * b) >> h] = D);
              Y(k);
              return E;
            },
            toWireType: function (k, l) {
              'string' !== typeof l &&
                U('Cannot pass non-string to C++ string type ' + d);
              var n = g(l),
                q = tb(4 + n + b);
              M[q >> 2] = n >> h;
              f(l, q + 4, n + b);
              null !== k && k.push(Y, q);
              return q;
            },
            argPackAdvance: 8,
            readValueFromPointer: Qa,
            X: function (k) {
              Y(k);
            },
          });
        },
        y: function (a, b, d, e, f, g) {
          Oa[a] = { name: T(b), ja: W(d, e), ka: W(f, g), aa: [] };
        },
        f: function (a, b, d, e, f, g, m, h, k, l) {
          Oa[a].aa.push({
            da: T(b),
            ha: d,
            fa: W(e, f),
            ga: g,
            ma: m,
            la: W(h, k),
            na: l,
          });
        },
        u: function (a, b) {
          b = T(b);
          S(a, {
            oa: !0,
            name: b,
            argPackAdvance: 0,
            fromWireType: function () {},
            toWireType: function () {},
          });
        },
        k: ab,
        n: function (a) {
          4 < a && (V[a].Z += 1);
        },
        z: function (a, b) {
          var d = R[a];
          void 0 === d && U('_emval_take_value has unknown type ' + jb(a));
          a = d.readValueFromPointer(b);
          return bb(a);
        },
        q: function (a, b, d) {
          H.copyWithin(a, b, b + d);
        },
        c: function (a) {
          var b = H.length;
          if (2147418112 < a) return !1;
          for (var d = 1; 4 >= d; d *= 2) {
            var e = b * (1 + 0.2 / d);
            e = Math.min(e, a + 100663296);
            e = Math.max(16777216, a, e);
            0 < e % 65536 && (e += 65536 - (e % 65536));
            a: {
              try {
                F.grow((Math.min(2147418112, e) - K.byteLength + 65535) >> 16);
                za(F.buffer);
                var f = 1;
                break a;
              } catch (g) {}
              f = void 0;
            }
            if (f) return !0;
          }
          return !1;
        },
        v: function (a, b) {
          var d = 0;
          ob().forEach(function (e, f) {
            var g = b + d;
            f = J[(a + 4 * f) >> 2] = g;
            for (g = 0; g < e.length; ++g) L[f++ >> 0] = e.charCodeAt(g);
            L[f >> 0] = 0;
            d += e.length + 1;
          });
          return 0;
        },
        w: function (a, b) {
          var d = ob();
          J[a >> 2] = d.length;
          var e = 0;
          d.forEach(function (f) {
            e += f.length + 1;
          });
          J[b >> 2] = e;
          return 0;
        },
        j: function (a) {
          if (!noExitRuntime && ((la = !0), c.onExit)) c.onExit(a);
          u(a, new ia(a));
        },
        x: function () {
          return 0;
        },
        o: function () {},
        i: function (a, b, d, e) {
          for (var f = 0, g = 0; g < d; g++) {
            for (
              var m = J[(b + 8 * g) >> 2], h = J[(b + (8 * g + 4)) >> 2], k = 0;
              k < h;
              k++
            ) {
              var l = H[m + k],
                n = qb[a];
              0 === l || 10 === l
                ? ((1 === a ? ja : B)(na(n, 0)), (n.length = 0))
                : n.push(l);
            }
            f += h;
          }
          J[e >> 2] = f;
          return 0;
        },
        memory: F,
        p: function () {},
        table: ka,
      },
      vb = (function () {
        function a(f) {
          c.asm = f.exports;
          N--;
          c.monitorRunDependencies && c.monitorRunDependencies(N);
          0 == N &&
            (null !== Ha && (clearInterval(Ha), (Ha = null)),
            O && ((f = O), (O = null), f()));
        }
        function b(f) {
          a(f.instance);
        }
        function d(f) {
          return La()
            .then(function (g) {
              return WebAssembly.instantiate(g, e);
            })
            .then(f, function (g) {
              B('failed to asynchronously prepare wasm: ' + g);
              A(g);
            });
        }
        var e = { a: ub };
        N++;
        c.monitorRunDependencies && c.monitorRunDependencies(N);
        if (c.instantiateWasm)
          try {
            return c.instantiateWasm(e, a);
          } catch (f) {
            return (
              B('Module.instantiateWasm callback failed with error: ' + f), !1
            );
          }
        (function () {
          if (
            C ||
            'function' !== typeof WebAssembly.instantiateStreaming ||
            Ia() ||
            'function' !== typeof fetch
          )
            return d(b);
          fetch(P, { credentials: 'same-origin' }).then(function (f) {
            return WebAssembly.instantiateStreaming(f, e).then(b, function (g) {
              B('wasm streaming compile failed: ' + g);
              B('falling back to ArrayBuffer instantiation');
              d(b);
            });
          });
        })();
        return {};
      })();
    c.asm = vb;
    var Ma = (c.___wasm_call_ctors = function () {
        return (Ma = c.___wasm_call_ctors = c.asm.A).apply(null, arguments);
      }),
      tb = (c._malloc = function () {
        return (tb = c._malloc = c.asm.B).apply(null, arguments);
      }),
      Y = (c._free = function () {
        return (Y = c._free = c.asm.C).apply(null, arguments);
      }),
      kb = (c.___getTypeName = function () {
        return (kb = c.___getTypeName = c.asm.D).apply(null, arguments);
      });
    c.___embind_register_native_and_builtin_types = function () {
      return (c.___embind_register_native_and_builtin_types = c.asm.E).apply(
        null,
        arguments,
      );
    };
    c.dynCall_i = function () {
      return (c.dynCall_i = c.asm.F).apply(null, arguments);
    };
    c.dynCall_vi = function () {
      return (c.dynCall_vi = c.asm.G).apply(null, arguments);
    };
    c.dynCall_iii = function () {
      return (c.dynCall_iii = c.asm.H).apply(null, arguments);
    };
    c.dynCall_viii = function () {
      return (c.dynCall_viii = c.asm.I).apply(null, arguments);
    };
    c.dynCall_ii = function () {
      return (c.dynCall_ii = c.asm.J).apply(null, arguments);
    };
    c.dynCall_iiiiii = function () {
      return (c.dynCall_iiiiii = c.asm.K).apply(null, arguments);
    };
    c.dynCall_viiiii = function () {
      return (c.dynCall_viiiii = c.asm.L).apply(null, arguments);
    };
    c.dynCall_v = function () {
      return (c.dynCall_v = c.asm.M).apply(null, arguments);
    };
    c.dynCall_vii = function () {
      return (c.dynCall_vii = c.asm.N).apply(null, arguments);
    };
    c.dynCall_iiiiiii = function () {
      return (c.dynCall_iiiiiii = c.asm.O).apply(null, arguments);
    };
    c.dynCall_iiiii = function () {
      return (c.dynCall_iiiii = c.asm.P).apply(null, arguments);
    };
    c.dynCall_iiii = function () {
      return (c.dynCall_iiii = c.asm.Q).apply(null, arguments);
    };
    c.dynCall_viiiiiiii = function () {
      return (c.dynCall_viiiiiiii = c.asm.R).apply(null, arguments);
    };
    c.dynCall_viiii = function () {
      return (c.dynCall_viiii = c.asm.S).apply(null, arguments);
    };
    c.dynCall_viiiiiii = function () {
      return (c.dynCall_viiiiiii = c.asm.T).apply(null, arguments);
    };
    c.dynCall_jiji = function () {
      return (c.dynCall_jiji = c.asm.U).apply(null, arguments);
    };
    c.dynCall_viiiiii = function () {
      return (c.dynCall_viiiiii = c.asm.V).apply(null, arguments);
    };
    c.asm = vb;
    var Z;
    c.then = function (a) {
      if (Z) a(c);
      else {
        var b = c.onRuntimeInitialized;
        c.onRuntimeInitialized = function () {
          b && b();
          a(c);
        };
      }
      return c;
    };
    function ia(a) {
      this.name = 'ExitStatus';
      this.message = 'Program terminated with exit(' + a + ')';
      this.status = a;
    }
    O = function wb() {
      Z || xb();
      Z || (O = wb);
    };
    function xb() {
      function a() {
        if (!Z && ((Z = !0), (c.calledRun = !0), !la)) {
          Ba(Da);
          Ba(Ea);
          if (c.onRuntimeInitialized) c.onRuntimeInitialized();
          if (c.postRun)
            for (
              'function' == typeof c.postRun && (c.postRun = [c.postRun]);
              c.postRun.length;

            ) {
              var b = c.postRun.shift();
              Fa.unshift(b);
            }
          Ba(Fa);
        }
      }
      if (!(0 < N)) {
        if (c.preRun)
          for (
            'function' == typeof c.preRun && (c.preRun = [c.preRun]);
            c.preRun.length;

          )
            Ga();
        Ba(Ca);
        0 < N ||
          (c.setStatus
            ? (c.setStatus('Running...'),
              setTimeout(function () {
                setTimeout(function () {
                  c.setStatus('');
                }, 1);
                a();
              }, 1))
            : a());
      }
    }
    c.run = xb;
    if (c.preInit)
      for (
        'function' == typeof c.preInit && (c.preInit = [c.preInit]);
        0 < c.preInit.length;

      )
        c.preInit.pop()();
    noExitRuntime = !0;
    xb();

    return mozjpeg_enc;
  };
})();
if (typeof exports === 'object' && typeof module === 'object')
  module.exports = mozjpeg_enc;
else if (typeof define === 'function' && define['amd'])
  define([], function () {
    return mozjpeg_enc;
  });
else if (typeof exports === 'object') exports['mozjpeg_enc'] = mozjpeg_enc;
