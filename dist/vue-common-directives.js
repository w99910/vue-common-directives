class Rr {
  static string(e = 5) {
    let n = "";
    const a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", t = a.length;
    let u = 0;
    for (; u < e; )
      n += a.charAt(Math.floor(Math.random() * t)), u += 1;
    return n;
  }
}
var pr = {
  update: null,
  begin: null,
  loopBegin: null,
  changeBegin: null,
  change: null,
  changeComplete: null,
  loopComplete: null,
  complete: null,
  loop: 1,
  direction: "normal",
  autoplay: !0,
  timelineOffset: 0
}, G = {
  duration: 1e3,
  delay: 0,
  endDelay: 0,
  easing: "easeOutElastic(1, .5)",
  round: 0
}, zr = ["translateX", "translateY", "translateZ", "rotate", "rotateX", "rotateY", "rotateZ", "scale", "scaleX", "scaleY", "scaleZ", "skew", "skewX", "skewY", "perspective", "matrix", "matrix3d"], U = {
  CSS: {},
  springs: {}
};
function I(r, e, n) {
  return Math.min(Math.max(r, e), n);
}
function z(r, e) {
  return r.indexOf(e) > -1;
}
function K(r, e) {
  return r.apply(null, e);
}
var f = {
  arr: function(r) {
    return Array.isArray(r);
  },
  obj: function(r) {
    return z(Object.prototype.toString.call(r), "Object");
  },
  pth: function(r) {
    return f.obj(r) && r.hasOwnProperty("totalLength");
  },
  svg: function(r) {
    return r instanceof SVGElement;
  },
  inp: function(r) {
    return r instanceof HTMLInputElement;
  },
  dom: function(r) {
    return r.nodeType || f.svg(r);
  },
  str: function(r) {
    return typeof r == "string";
  },
  fnc: function(r) {
    return typeof r == "function";
  },
  und: function(r) {
    return typeof r > "u";
  },
  nil: function(r) {
    return f.und(r) || r === null;
  },
  hex: function(r) {
    return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(r);
  },
  rgb: function(r) {
    return /^rgb/.test(r);
  },
  hsl: function(r) {
    return /^hsl/.test(r);
  },
  col: function(r) {
    return f.hex(r) || f.rgb(r) || f.hsl(r);
  },
  key: function(r) {
    return !pr.hasOwnProperty(r) && !G.hasOwnProperty(r) && r !== "targets" && r !== "keyframes";
  }
};
function yr(r) {
  var e = /\(([^)]+)\)/.exec(r);
  return e ? e[1].split(",").map(function(n) {
    return parseFloat(n);
  }) : [];
}
function br(r, e) {
  var n = yr(r), a = I(f.und(n[0]) ? 1 : n[0], 0.1, 100), t = I(f.und(n[1]) ? 100 : n[1], 0.1, 100), u = I(f.und(n[2]) ? 10 : n[2], 0.1, 100), o = I(f.und(n[3]) ? 0 : n[3], 0.1, 100), s = Math.sqrt(t / a), i = u / (2 * Math.sqrt(t * a)), m = i < 1 ? s * Math.sqrt(1 - i * i) : 0, c = 1, l = i < 1 ? (i * s + -o) / m : -o + s;
  function h(p) {
    var v = e ? e * p / 1e3 : p;
    return i < 1 ? v = Math.exp(-v * i * s) * (c * Math.cos(m * v) + l * Math.sin(m * v)) : v = (c + l * v) * Math.exp(-v * s), p === 0 || p === 1 ? p : 1 - v;
  }
  function w() {
    var p = U.springs[r];
    if (p)
      return p;
    for (var v = 1 / 6, y = 0, M = 0; ; )
      if (y += v, h(y) === 1) {
        if (M++, M >= 16)
          break;
      } else
        M = 0;
    var g = y * v * 1e3;
    return U.springs[r] = g, g;
  }
  return e ? h : w;
}
function Hr(r) {
  return r === void 0 && (r = 10), function(e) {
    return Math.ceil(I(e, 1e-6, 1) * r) * (1 / r);
  };
}
var Ur = function() {
  var r = 11, e = 1 / (r - 1);
  function n(c, l) {
    return 1 - 3 * l + 3 * c;
  }
  function a(c, l) {
    return 3 * l - 6 * c;
  }
  function t(c) {
    return 3 * c;
  }
  function u(c, l, h) {
    return ((n(l, h) * c + a(l, h)) * c + t(l)) * c;
  }
  function o(c, l, h) {
    return 3 * n(l, h) * c * c + 2 * a(l, h) * c + t(l);
  }
  function s(c, l, h, w, p) {
    var v, y, M = 0;
    do
      y = l + (h - l) / 2, v = u(y, w, p) - c, v > 0 ? h = y : l = y;
    while (Math.abs(v) > 1e-7 && ++M < 10);
    return y;
  }
  function i(c, l, h, w) {
    for (var p = 0; p < 4; ++p) {
      var v = o(l, h, w);
      if (v === 0)
        return l;
      var y = u(l, h, w) - c;
      l -= y / v;
    }
    return l;
  }
  function m(c, l, h, w) {
    if (!(0 <= c && c <= 1 && 0 <= h && h <= 1))
      return;
    var p = new Float32Array(r);
    if (c !== l || h !== w)
      for (var v = 0; v < r; ++v)
        p[v] = u(v * e, c, h);
    function y(M) {
      for (var g = 0, d = 1, P = r - 1; d !== P && p[d] <= M; ++d)
        g += e;
      --d;
      var L = (M - p[d]) / (p[d + 1] - p[d]), b = g + L * e, O = o(b, c, h);
      return O >= 1e-3 ? i(M, b, c, h) : O === 0 ? b : s(M, g, g + e, c, h);
    }
    return function(M) {
      return c === l && h === w || M === 0 || M === 1 ? M : u(y(M), l, w);
    };
  }
  return m;
}(), xr = function() {
  var r = { linear: function() {
    return function(a) {
      return a;
    };
  } }, e = {
    Sine: function() {
      return function(a) {
        return 1 - Math.cos(a * Math.PI / 2);
      };
    },
    Circ: function() {
      return function(a) {
        return 1 - Math.sqrt(1 - a * a);
      };
    },
    Back: function() {
      return function(a) {
        return a * a * (3 * a - 2);
      };
    },
    Bounce: function() {
      return function(a) {
        for (var t, u = 4; a < ((t = Math.pow(2, --u)) - 1) / 11; )
          ;
        return 1 / Math.pow(4, 3 - u) - 7.5625 * Math.pow((t * 3 - 2) / 22 - a, 2);
      };
    },
    Elastic: function(a, t) {
      a === void 0 && (a = 1), t === void 0 && (t = 0.5);
      var u = I(a, 1, 10), o = I(t, 0.1, 2);
      return function(s) {
        return s === 0 || s === 1 ? s : -u * Math.pow(2, 10 * (s - 1)) * Math.sin((s - 1 - o / (Math.PI * 2) * Math.asin(1 / u)) * (Math.PI * 2) / o);
      };
    }
  }, n = ["Quad", "Cubic", "Quart", "Quint", "Expo"];
  return n.forEach(function(a, t) {
    e[a] = function() {
      return function(u) {
        return Math.pow(u, t + 2);
      };
    };
  }), Object.keys(e).forEach(function(a) {
    var t = e[a];
    r["easeIn" + a] = t, r["easeOut" + a] = function(u, o) {
      return function(s) {
        return 1 - t(u, o)(1 - s);
      };
    }, r["easeInOut" + a] = function(u, o) {
      return function(s) {
        return s < 0.5 ? t(u, o)(s * 2) / 2 : 1 - t(u, o)(s * -2 + 2) / 2;
      };
    }, r["easeOutIn" + a] = function(u, o) {
      return function(s) {
        return s < 0.5 ? (1 - t(u, o)(1 - s * 2)) / 2 : (t(u, o)(s * 2 - 1) + 1) / 2;
      };
    };
  }), r;
}();
function X(r, e) {
  if (f.fnc(r))
    return r;
  var n = r.split("(")[0], a = xr[n], t = yr(r);
  switch (n) {
    case "spring":
      return br(r, e);
    case "cubicBezier":
      return K(Ur, t);
    case "steps":
      return K(Hr, t);
    default:
      return K(a, t);
  }
}
function Mr(r) {
  try {
    var e = document.querySelectorAll(r);
    return e;
  } catch {
    return;
  }
}
function W(r, e) {
  for (var n = r.length, a = arguments.length >= 2 ? arguments[1] : void 0, t = [], u = 0; u < n; u++)
    if (u in r) {
      var o = r[u];
      e.call(a, o, u, r) && t.push(o);
    }
  return t;
}
function q(r) {
  return r.reduce(function(e, n) {
    return e.concat(f.arr(n) ? q(n) : n);
  }, []);
}
function vr(r) {
  return f.arr(r) ? r : (f.str(r) && (r = Mr(r) || r), r instanceof NodeList || r instanceof HTMLCollection ? [].slice.call(r) : [r]);
}
function rr(r, e) {
  return r.some(function(n) {
    return n === e;
  });
}
function er(r) {
  var e = {};
  for (var n in r)
    e[n] = r[n];
  return e;
}
function J(r, e) {
  var n = er(r);
  for (var a in r)
    n[a] = e.hasOwnProperty(a) ? e[a] : r[a];
  return n;
}
function N(r, e) {
  var n = er(r);
  for (var a in e)
    n[a] = f.und(r[a]) ? e[a] : r[a];
  return n;
}
function Wr(r) {
  var e = /rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec(r);
  return e ? "rgba(" + e[1] + ",1)" : r;
}
function qr(r) {
  var e = /^#?([a-f\d])([a-f\d])([a-f\d])$/i, n = r.replace(e, function(s, i, m, c) {
    return i + i + m + m + c + c;
  }), a = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(n), t = parseInt(a[1], 16), u = parseInt(a[2], 16), o = parseInt(a[3], 16);
  return "rgba(" + t + "," + u + "," + o + ",1)";
}
function Nr(r) {
  var e = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(r) || /hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(r), n = parseInt(e[1], 10) / 360, a = parseInt(e[2], 10) / 100, t = parseInt(e[3], 10) / 100, u = e[4] || 1;
  function o(h, w, p) {
    return p < 0 && (p += 1), p > 1 && (p -= 1), p < 1 / 6 ? h + (w - h) * 6 * p : p < 1 / 2 ? w : p < 2 / 3 ? h + (w - h) * (2 / 3 - p) * 6 : h;
  }
  var s, i, m;
  if (a == 0)
    s = i = m = t;
  else {
    var c = t < 0.5 ? t * (1 + a) : t + a - t * a, l = 2 * t - c;
    s = o(l, c, n + 1 / 3), i = o(l, c, n), m = o(l, c, n - 1 / 3);
  }
  return "rgba(" + s * 255 + "," + i * 255 + "," + m * 255 + "," + u + ")";
}
function Zr(r) {
  if (f.rgb(r))
    return Wr(r);
  if (f.hex(r))
    return qr(r);
  if (f.hsl(r))
    return Nr(r);
}
function E(r) {
  var e = /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(r);
  if (e)
    return e[1];
}
function Qr(r) {
  if (z(r, "translate") || r === "perspective")
    return "px";
  if (z(r, "rotate") || z(r, "skew"))
    return "deg";
}
function Y(r, e) {
  return f.fnc(r) ? r(e.target, e.id, e.total) : r;
}
function D(r, e) {
  return r.getAttribute(e);
}
function nr(r, e, n) {
  var a = E(e);
  if (rr([n, "deg", "rad", "turn"], a))
    return e;
  var t = U.CSS[e + n];
  if (!f.und(t))
    return t;
  var u = 100, o = document.createElement(r.tagName), s = r.parentNode && r.parentNode !== document ? r.parentNode : document.body;
  s.appendChild(o), o.style.position = "absolute", o.style.width = u + n;
  var i = u / o.offsetWidth;
  s.removeChild(o);
  var m = i * parseFloat(e);
  return U.CSS[e + n] = m, m;
}
function Tr(r, e, n) {
  if (e in r.style) {
    var a = e.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(), t = r.style[e] || getComputedStyle(r).getPropertyValue(a) || "0";
    return n ? nr(r, t, n) : t;
  }
}
function tr(r, e) {
  if (f.dom(r) && !f.inp(r) && (!f.nil(D(r, e)) || f.svg(r) && r[e]))
    return "attribute";
  if (f.dom(r) && rr(zr, e))
    return "transform";
  if (f.dom(r) && e !== "transform" && Tr(r, e))
    return "css";
  if (r[e] != null)
    return "object";
}
function wr(r) {
  if (f.dom(r)) {
    for (var e = r.style.transform || "", n = /(\w+)\(([^)]*)\)/g, a = /* @__PURE__ */ new Map(), t; t = n.exec(e); )
      a.set(t[1], t[2]);
    return a;
  }
}
function $r(r, e, n, a) {
  var t = z(e, "scale") ? 1 : 0 + Qr(e), u = wr(r).get(e) || t;
  return n && (n.transforms.list.set(e, u), n.transforms.last = e), a ? nr(r, u, a) : u;
}
function ar(r, e, n, a) {
  switch (tr(r, e)) {
    case "transform":
      return $r(r, e, a, n);
    case "css":
      return Tr(r, e, n);
    case "attribute":
      return D(r, e);
    default:
      return r[e] || 0;
  }
}
function ir(r, e) {
  var n = /^(\*=|\+=|-=)/.exec(r);
  if (!n)
    return r;
  var a = E(r) || 0, t = parseFloat(e), u = parseFloat(r.replace(n[0], ""));
  switch (n[0][0]) {
    case "+":
      return t + u + a;
    case "-":
      return t - u + a;
    case "*":
      return t * u + a;
  }
}
function Pr(r, e) {
  if (f.col(r))
    return Zr(r);
  if (/\s/g.test(r))
    return r;
  var n = E(r), a = n ? r.substr(0, r.length - n.length) : r;
  return e ? a + e : a;
}
function ur(r, e) {
  return Math.sqrt(Math.pow(e.x - r.x, 2) + Math.pow(e.y - r.y, 2));
}
function Kr(r) {
  return Math.PI * 2 * D(r, "r");
}
function _r(r) {
  return D(r, "width") * 2 + D(r, "height") * 2;
}
function Jr(r) {
  return ur(
    { x: D(r, "x1"), y: D(r, "y1") },
    { x: D(r, "x2"), y: D(r, "y2") }
  );
}
function kr(r) {
  for (var e = r.points, n = 0, a, t = 0; t < e.numberOfItems; t++) {
    var u = e.getItem(t);
    t > 0 && (n += ur(a, u)), a = u;
  }
  return n;
}
function Yr(r) {
  var e = r.points;
  return kr(r) + ur(e.getItem(e.numberOfItems - 1), e.getItem(0));
}
function Cr(r) {
  if (r.getTotalLength)
    return r.getTotalLength();
  switch (r.tagName.toLowerCase()) {
    case "circle":
      return Kr(r);
    case "rect":
      return _r(r);
    case "line":
      return Jr(r);
    case "polyline":
      return kr(r);
    case "polygon":
      return Yr(r);
  }
}
function Gr(r) {
  var e = Cr(r);
  return r.setAttribute("stroke-dasharray", e), e;
}
function Xr(r) {
  for (var e = r.parentNode; f.svg(e) && f.svg(e.parentNode); )
    e = e.parentNode;
  return e;
}
function Ir(r, e) {
  var n = e || {}, a = n.el || Xr(r), t = a.getBoundingClientRect(), u = D(a, "viewBox"), o = t.width, s = t.height, i = n.viewBox || (u ? u.split(" ") : [0, 0, o, s]);
  return {
    el: a,
    viewBox: i,
    x: i[0] / 1,
    y: i[1] / 1,
    w: o,
    h: s,
    vW: i[2],
    vH: i[3]
  };
}
function re(r, e) {
  var n = f.str(r) ? Mr(r)[0] : r, a = e || 100;
  return function(t) {
    return {
      property: t,
      el: n,
      svg: Ir(n),
      totalLength: Cr(n) * (a / 100)
    };
  };
}
function ee(r, e, n) {
  function a(c) {
    c === void 0 && (c = 0);
    var l = e + c >= 1 ? e + c : 0;
    return r.el.getPointAtLength(l);
  }
  var t = Ir(r.el, r.svg), u = a(), o = a(-1), s = a(1), i = n ? 1 : t.w / t.vW, m = n ? 1 : t.h / t.vH;
  switch (r.property) {
    case "x":
      return (u.x - t.x) * i;
    case "y":
      return (u.y - t.y) * m;
    case "angle":
      return Math.atan2(s.y - o.y, s.x - o.x) * 180 / Math.PI;
  }
}
function dr(r, e) {
  var n = /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g, a = Pr(f.pth(r) ? r.totalLength : r, e) + "";
  return {
    original: a,
    numbers: a.match(n) ? a.match(n).map(Number) : [0],
    strings: f.str(r) || e ? a.split(n) : []
  };
}
function or(r) {
  var e = r ? q(f.arr(r) ? r.map(vr) : vr(r)) : [];
  return W(e, function(n, a, t) {
    return t.indexOf(n) === a;
  });
}
function Dr(r) {
  var e = or(r);
  return e.map(function(n, a) {
    return { target: n, id: a, total: e.length, transforms: { list: wr(n) } };
  });
}
function ne(r, e) {
  var n = er(e);
  if (/^spring/.test(n.easing) && (n.duration = br(n.easing)), f.arr(r)) {
    var a = r.length, t = a === 2 && !f.obj(r[0]);
    t ? r = { value: r } : f.fnc(e.duration) || (n.duration = e.duration / a);
  }
  var u = f.arr(r) ? r : [r];
  return u.map(function(o, s) {
    var i = f.obj(o) && !f.pth(o) ? o : { value: o };
    return f.und(i.delay) && (i.delay = s ? 0 : e.delay), f.und(i.endDelay) && (i.endDelay = s === u.length - 1 ? e.endDelay : 0), i;
  }).map(function(o) {
    return N(o, n);
  });
}
function te(r) {
  for (var e = W(q(r.map(function(u) {
    return Object.keys(u);
  })), function(u) {
    return f.key(u);
  }).reduce(function(u, o) {
    return u.indexOf(o) < 0 && u.push(o), u;
  }, []), n = {}, a = function(u) {
    var o = e[u];
    n[o] = r.map(function(s) {
      var i = {};
      for (var m in s)
        f.key(m) ? m == o && (i.value = s[m]) : i[m] = s[m];
      return i;
    });
  }, t = 0; t < e.length; t++)
    a(t);
  return n;
}
function ae(r, e) {
  var n = [], a = e.keyframes;
  a && (e = N(te(a), e));
  for (var t in e)
    f.key(t) && n.push({
      name: t,
      tweens: ne(e[t], r)
    });
  return n;
}
function ie(r, e) {
  var n = {};
  for (var a in r) {
    var t = Y(r[a], e);
    f.arr(t) && (t = t.map(function(u) {
      return Y(u, e);
    }), t.length === 1 && (t = t[0])), n[a] = t;
  }
  return n.duration = parseFloat(n.duration), n.delay = parseFloat(n.delay), n;
}
function ue(r, e) {
  var n;
  return r.tweens.map(function(a) {
    var t = ie(a, e), u = t.value, o = f.arr(u) ? u[1] : u, s = E(o), i = ar(e.target, r.name, s, e), m = n ? n.to.original : i, c = f.arr(u) ? u[0] : m, l = E(c) || E(i), h = s || l;
    return f.und(o) && (o = m), t.from = dr(c, h), t.to = dr(ir(o, c), h), t.start = n ? n.end : 0, t.end = t.start + t.delay + t.duration + t.endDelay, t.easing = X(t.easing, t.duration), t.isPath = f.pth(u), t.isPathTargetInsideSVG = t.isPath && f.svg(e.target), t.isColor = f.col(t.from.original), t.isColor && (t.round = 1), n = t, t;
  });
}
var Er = {
  css: function(r, e, n) {
    return r.style[e] = n;
  },
  attribute: function(r, e, n) {
    return r.setAttribute(e, n);
  },
  object: function(r, e, n) {
    return r[e] = n;
  },
  transform: function(r, e, n, a, t) {
    if (a.list.set(e, n), e === a.last || t) {
      var u = "";
      a.list.forEach(function(o, s) {
        u += s + "(" + o + ") ";
      }), r.style.transform = u;
    }
  }
};
function Lr(r, e) {
  var n = Dr(r);
  n.forEach(function(a) {
    for (var t in e) {
      var u = Y(e[t], a), o = a.target, s = E(u), i = ar(o, t, s, a), m = s || E(i), c = ir(Pr(u, m), i), l = tr(o, t);
      Er[l](o, t, c, a.transforms, !0);
    }
  });
}
function oe(r, e) {
  var n = tr(r.target, e.name);
  if (n) {
    var a = ue(e, r), t = a[a.length - 1];
    return {
      type: n,
      property: e.name,
      animatable: r,
      tweens: a,
      duration: t.end,
      delay: a[0].delay,
      endDelay: t.endDelay
    };
  }
}
function se(r, e) {
  return W(q(r.map(function(n) {
    return e.map(function(a) {
      return oe(n, a);
    });
  })), function(n) {
    return !f.und(n);
  });
}
function Or(r, e) {
  var n = r.length, a = function(u) {
    return u.timelineOffset ? u.timelineOffset : 0;
  }, t = {};
  return t.duration = n ? Math.max.apply(Math, r.map(function(u) {
    return a(u) + u.duration;
  })) : e.duration, t.delay = n ? Math.min.apply(Math, r.map(function(u) {
    return a(u) + u.delay;
  })) : e.delay, t.endDelay = n ? t.duration - Math.max.apply(Math, r.map(function(u) {
    return a(u) + u.duration - u.endDelay;
  })) : e.endDelay, t;
}
var gr = 0;
function ce(r) {
  var e = J(pr, r), n = J(G, r), a = ae(n, r), t = Dr(r.targets), u = se(t, a), o = Or(u, n), s = gr;
  return gr++, N(e, {
    id: s,
    children: [],
    animatables: t,
    animations: u,
    duration: o.duration,
    delay: o.delay,
    endDelay: o.endDelay
  });
}
var C = [], Sr = function() {
  var r;
  function e() {
    !r && (!hr() || !x.suspendWhenDocumentHidden) && C.length > 0 && (r = requestAnimationFrame(n));
  }
  function n(t) {
    for (var u = C.length, o = 0; o < u; ) {
      var s = C[o];
      s.paused ? (C.splice(o, 1), u--) : (s.tick(t), o++);
    }
    r = o > 0 ? requestAnimationFrame(n) : void 0;
  }
  function a() {
    x.suspendWhenDocumentHidden && (hr() ? r = cancelAnimationFrame(r) : (C.forEach(
      function(t) {
        return t._onDocumentVisibility();
      }
    ), Sr()));
  }
  return typeof document < "u" && document.addEventListener("visibilitychange", a), e;
}();
function hr() {
  return !!document && document.hidden;
}
function x(r) {
  r === void 0 && (r = {});
  var e = 0, n = 0, a = 0, t, u = 0, o = null;
  function s(g) {
    var d = window.Promise && new Promise(function(P) {
      return o = P;
    });
    return g.finished = d, d;
  }
  var i = ce(r);
  s(i);
  function m() {
    var g = i.direction;
    g !== "alternate" && (i.direction = g !== "normal" ? "normal" : "reverse"), i.reversed = !i.reversed, t.forEach(function(d) {
      return d.reversed = i.reversed;
    });
  }
  function c(g) {
    return i.reversed ? i.duration - g : g;
  }
  function l() {
    e = 0, n = c(i.currentTime) * (1 / x.speed);
  }
  function h(g, d) {
    d && d.seek(g - d.timelineOffset);
  }
  function w(g) {
    if (i.reversePlayback)
      for (var P = u; P--; )
        h(g, t[P]);
    else
      for (var d = 0; d < u; d++)
        h(g, t[d]);
  }
  function p(g) {
    for (var d = 0, P = i.animations, L = P.length; d < L; ) {
      var b = P[d], O = b.animatable, F = b.tweens, S = F.length - 1, T = F[S];
      S && (T = W(F, function(jr) {
        return g < jr.end;
      })[0] || T);
      for (var B = I(g - T.start - T.delay, 0, T.duration) / T.duration, H = isNaN(B) ? 1 : T.easing(B), k = T.to.strings, Z = T.round, Q = [], Vr = T.to.numbers.length, A = void 0, V = 0; V < Vr; V++) {
        var j = void 0, sr = T.to.numbers[V], cr = T.from.numbers[V] || 0;
        T.isPath ? j = ee(T.value, H * sr, T.isPathTargetInsideSVG) : j = cr + H * (sr - cr), Z && (T.isColor && V > 2 || (j = Math.round(j * Z) / Z)), Q.push(j);
      }
      var fr = k.length;
      if (!fr)
        A = Q[0];
      else {
        A = k[0];
        for (var R = 0; R < fr; R++) {
          k[R];
          var lr = k[R + 1], $ = Q[R];
          isNaN($) || (lr ? A += $ + lr : A += $ + " ");
        }
      }
      Er[b.type](O.target, b.property, A, O.transforms), b.currentValue = A, d++;
    }
  }
  function v(g) {
    i[g] && !i.passThrough && i[g](i);
  }
  function y() {
    i.remaining && i.remaining !== !0 && i.remaining--;
  }
  function M(g) {
    var d = i.duration, P = i.delay, L = d - i.endDelay, b = c(g);
    i.progress = I(b / d * 100, 0, 100), i.reversePlayback = b < i.currentTime, t && w(b), !i.began && i.currentTime > 0 && (i.began = !0, v("begin")), !i.loopBegan && i.currentTime > 0 && (i.loopBegan = !0, v("loopBegin")), b <= P && i.currentTime !== 0 && p(0), (b >= L && i.currentTime !== d || !d) && p(d), b > P && b < L ? (i.changeBegan || (i.changeBegan = !0, i.changeCompleted = !1, v("changeBegin")), v("change"), p(b)) : i.changeBegan && (i.changeCompleted = !0, i.changeBegan = !1, v("changeComplete")), i.currentTime = I(b, 0, d), i.began && v("update"), g >= d && (n = 0, y(), i.remaining ? (e = a, v("loopComplete"), i.loopBegan = !1, i.direction === "alternate" && m()) : (i.paused = !0, i.completed || (i.completed = !0, v("loopComplete"), v("complete"), !i.passThrough && "Promise" in window && (o(), s(i)))));
  }
  return i.reset = function() {
    var g = i.direction;
    i.passThrough = !1, i.currentTime = 0, i.progress = 0, i.paused = !0, i.began = !1, i.loopBegan = !1, i.changeBegan = !1, i.completed = !1, i.changeCompleted = !1, i.reversePlayback = !1, i.reversed = g === "reverse", i.remaining = i.loop, t = i.children, u = t.length;
    for (var d = u; d--; )
      i.children[d].reset();
    (i.reversed && i.loop !== !0 || g === "alternate" && i.loop === 1) && i.remaining++, p(i.reversed ? i.duration : 0);
  }, i._onDocumentVisibility = l, i.set = function(g, d) {
    return Lr(g, d), i;
  }, i.tick = function(g) {
    a = g, e || (e = a), M((a + (n - e)) * x.speed);
  }, i.seek = function(g) {
    M(c(g));
  }, i.pause = function() {
    i.paused = !0, l();
  }, i.play = function() {
    i.paused && (i.completed && i.reset(), i.paused = !1, C.push(i), l(), Sr());
  }, i.reverse = function() {
    m(), i.completed = !i.reversed, l();
  }, i.restart = function() {
    i.reset(), i.play();
  }, i.remove = function(g) {
    var d = or(g);
    Br(d, i);
  }, i.reset(), i.autoplay && i.play(), i;
}
function mr(r, e) {
  for (var n = e.length; n--; )
    rr(r, e[n].animatable.target) && e.splice(n, 1);
}
function Br(r, e) {
  var n = e.animations, a = e.children;
  mr(r, n);
  for (var t = a.length; t--; ) {
    var u = a[t], o = u.animations;
    mr(r, o), !o.length && !u.children.length && a.splice(t, 1);
  }
  !n.length && !a.length && e.pause();
}
function fe(r) {
  for (var e = or(r), n = C.length; n--; ) {
    var a = C[n];
    Br(e, a);
  }
}
function le(r, e) {
  e === void 0 && (e = {});
  var n = e.direction || "normal", a = e.easing ? X(e.easing) : null, t = e.grid, u = e.axis, o = e.from || 0, s = o === "first", i = o === "center", m = o === "last", c = f.arr(r), l = parseFloat(c ? r[0] : r), h = c ? parseFloat(r[1]) : 0, w = E(c ? r[1] : r) || 0, p = e.start || 0 + (c ? l : 0), v = [], y = 0;
  return function(M, g, d) {
    if (s && (o = 0), i && (o = (d - 1) / 2), m && (o = d - 1), !v.length) {
      for (var P = 0; P < d; P++) {
        if (!t)
          v.push(Math.abs(o - P));
        else {
          var L = i ? (t[0] - 1) / 2 : o % t[0], b = i ? (t[1] - 1) / 2 : Math.floor(o / t[0]), O = P % t[0], F = Math.floor(P / t[0]), S = L - O, T = b - F, B = Math.sqrt(S * S + T * T);
          u === "x" && (B = -S), u === "y" && (B = -T), v.push(B);
        }
        y = Math.max.apply(Math, v);
      }
      a && (v = v.map(function(k) {
        return a(k / y) * y;
      })), n === "reverse" && (v = v.map(function(k) {
        return u ? k < 0 ? k * -1 : -k : Math.abs(y - k);
      }));
    }
    var H = c ? (h - l) / y : l;
    return p + H * (Math.round(v[g] * 100) / 100) + w;
  };
}
function ve(r) {
  r === void 0 && (r = {});
  var e = x(r);
  return e.duration = 0, e.add = function(n, a) {
    var t = C.indexOf(e), u = e.children;
    t > -1 && C.splice(t, 1);
    function o(h) {
      h.passThrough = !0;
    }
    for (var s = 0; s < u.length; s++)
      o(u[s]);
    var i = N(n, J(G, r));
    i.targets = i.targets || r.targets;
    var m = e.duration;
    i.autoplay = !1, i.direction = e.direction, i.timelineOffset = f.und(a) ? m : ir(a, m), o(e), e.seek(i.timelineOffset);
    var c = x(i);
    o(c), u.push(c);
    var l = Or(u, r);
    return e.delay = l.delay, e.endDelay = l.endDelay, e.duration = l.duration, e.seek(0), e.reset(), e.autoplay && e.play(), e;
  }, e;
}
x.version = "3.2.1";
x.speed = 1;
x.suspendWhenDocumentHidden = !0;
x.running = C;
x.remove = fe;
x.get = ar;
x.set = Lr;
x.convertPx = nr;
x.path = re;
x.setDashoffset = Gr;
x.stagger = le;
x.timeline = ve;
x.easing = X;
x.penner = xr;
x.random = function(r, e) {
  return Math.floor(Math.random() * (e - r + 1)) + r;
};
function de(r, e, n) {
  const a = r.getBoundingClientRect(), t = n.target.getBoundingClientRect();
  t.left >= a.left && t.right <= a.right && t.top >= a.top && t.bottom <= a.bottom || e.value(n);
}
let _ = null;
const Ar = {
  mounted(r, e) {
    typeof e.value == "function" && (r.id = Rr.string(), _ = de.bind(null, r, e), document.addEventListener("click", _, !0));
  },
  unmounted(r, e) {
    typeof e.value == "function" && document.removeEventListener("click", _, !0);
  }
}, Fr = {
  count: 0,
  mounted(r, e) {
    if (typeof e.value == "function") {
      let n = 0;
      r.addEventListener("click", (a) => {
        setTimeout(() => {
          n === 2 && e.value(a), n = 0;
        }, 300), n++;
      });
    }
  },
  unmounted(r, e) {
    typeof e.value == "function" && r.removeEventListener("click", (n) => {
      this.count++, setTimeout(() => {
        this.count === 1 && (console.log("click"), e.value(n)), this.count = 0;
      }, 300);
    });
  }
}, ge = (r) => {
  r.directive("click-outside", Ar), r.directive("double-click", Fr);
}, he = {
  ClickOutside: Ar,
  DoubleClick: Fr
};
export {
  he as default,
  ge as registerDirectives
};
