var ye, m, ot, rt, F, Be, st, lt, at, Ae, Te, Ie, ue = {}, fe = [], Rt = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, be = Array.isArray;
function R(t, e) {
  for (var n in e) t[n] = e[n];
  return t;
}
function Me(t) {
  t && t.parentNode && t.parentNode.removeChild(t);
}
function ct(t, e, n) {
  var i, r, o, l = {};
  for (o in e) o == "key" ? i = e[o] : o == "ref" ? r = e[o] : l[o] = e[o];
  if (arguments.length > 2 && (l.children = arguments.length > 3 ? ye.call(arguments, 2) : n), typeof t == "function" && t.defaultProps != null) for (o in t.defaultProps) l[o] === void 0 && (l[o] = t.defaultProps[o]);
  return ae(t, l, i, r, null);
}
function ae(t, e, n, i, r) {
  var o = { type: t, props: e, key: n, ref: i, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: r ?? ++ot, __i: -1, __u: 0 };
  return r == null && m.vnode != null && m.vnode(o), o;
}
function H(t) {
  return t.children;
}
function X(t, e) {
  this.props = t, this.context = e;
}
function q(t, e) {
  if (e == null) return t.__ ? q(t.__, t.__i + 1) : null;
  for (var n; e < t.__k.length; e++) if ((n = t.__k[e]) != null && n.__e != null) return n.__e;
  return typeof t.type == "function" ? q(t) : null;
}
function Ut(t) {
  if (t.__P && t.__d) {
    var e = t.__v, n = e.__e, i = [], r = [], o = R({}, e);
    o.__v = e.__v + 1, m.vnode && m.vnode(o), Re(t.__P, o, e, t.__n, t.__P.namespaceURI, 32 & e.__u ? [n] : null, i, n ?? q(e), !!(32 & e.__u), r), o.__v = e.__v, o.__.__k[o.__i] = o, dt(i, o, r), e.__e = e.__ = null, o.__e != n && ut(o);
  }
}
function ut(t) {
  if ((t = t.__) != null && t.__c != null) return t.__e = t.__c.base = null, t.__k.some(function(e) {
    if (e != null && e.__e != null) return t.__e = t.__c.base = e.__e;
  }), ut(t);
}
function Ve(t) {
  (!t.__d && (t.__d = !0) && F.push(t) && !_e.__r++ || Be != m.debounceRendering) && ((Be = m.debounceRendering) || st)(_e);
}
function _e() {
  for (var t, e = 1; F.length; ) F.length > e && F.sort(lt), t = F.shift(), e = F.length, Ut(t);
  _e.__r = 0;
}
function ft(t, e, n, i, r, o, l, a, f, c, d) {
  var s, p, _, h, $, b, y, g = i && i.__k || fe, U = e.length;
  for (f = Dt(n, e, g, f, U), s = 0; s < U; s++) (_ = n.__k[s]) != null && (p = _.__i != -1 && g[_.__i] || ue, _.__i = s, b = Re(t, _, p, r, o, l, a, f, c, d), h = _.__e, _.ref && p.ref != _.ref && (p.ref && Ue(p.ref, null, _), d.push(_.ref, _.__c || h, _)), $ == null && h != null && ($ = h), (y = !!(4 & _.__u)) || p.__k === _.__k ? f = _t(_, f, t, y) : typeof _.type == "function" && b !== void 0 ? f = b : h && (f = h.nextSibling), _.__u &= -7);
  return n.__e = $, f;
}
function Dt(t, e, n, i, r) {
  var o, l, a, f, c, d = n.length, s = d, p = 0;
  for (t.__k = new Array(r), o = 0; o < r; o++) (l = e[o]) != null && typeof l != "boolean" && typeof l != "function" ? (typeof l == "string" || typeof l == "number" || typeof l == "bigint" || l.constructor == String ? l = t.__k[o] = ae(null, l, null, null, null) : be(l) ? l = t.__k[o] = ae(H, { children: l }, null, null, null) : l.constructor === void 0 && l.__b > 0 ? l = t.__k[o] = ae(l.type, l.props, l.key, l.ref ? l.ref : null, l.__v) : t.__k[o] = l, f = o + p, l.__ = t, l.__b = t.__b + 1, a = null, (c = l.__i = Ht(l, n, f, s)) != -1 && (s--, (a = n[c]) && (a.__u |= 2)), a == null || a.__v == null ? (c == -1 && (r > d ? p-- : r < d && p++), typeof l.type != "function" && (l.__u |= 4)) : c != f && (c == f - 1 ? p-- : c == f + 1 ? p++ : (c > f ? p-- : p++, l.__u |= 4))) : t.__k[o] = null;
  if (s) for (o = 0; o < d; o++) (a = n[o]) != null && (2 & a.__u) == 0 && (a.__e == i && (i = q(a)), ht(a, a));
  return i;
}
function _t(t, e, n, i) {
  var r, o;
  if (typeof t.type == "function") {
    for (r = t.__k, o = 0; r && o < r.length; o++) r[o] && (r[o].__ = t, e = _t(r[o], e, n, i));
    return e;
  }
  t.__e != e && (i && (e && t.type && !e.parentNode && (e = q(t)), n.insertBefore(t.__e, e || null)), e = t.__e);
  do
    e = e && e.nextSibling;
  while (e != null && e.nodeType == 8);
  return e;
}
function Ht(t, e, n, i) {
  var r, o, l, a = t.key, f = t.type, c = e[n], d = c != null && (2 & c.__u) == 0;
  if (c === null && a == null || d && a == c.key && f == c.type) return n;
  if (i > (d ? 1 : 0)) {
    for (r = n - 1, o = n + 1; r >= 0 || o < e.length; ) if ((c = e[l = r >= 0 ? r-- : o++]) != null && (2 & c.__u) == 0 && a == c.key && f == c.type) return l;
  }
  return -1;
}
function qe(t, e, n) {
  e[0] == "-" ? t.setProperty(e, n ?? "") : t[e] = n == null ? "" : typeof n != "number" || Rt.test(e) ? n : n + "px";
}
function se(t, e, n, i, r) {
  var o, l;
  e: if (e == "style") if (typeof n == "string") t.style.cssText = n;
  else {
    if (typeof i == "string" && (t.style.cssText = i = ""), i) for (e in i) n && e in n || qe(t.style, e, "");
    if (n) for (e in n) i && n[e] == i[e] || qe(t.style, e, n[e]);
  }
  else if (e[0] == "o" && e[1] == "n") o = e != (e = e.replace(at, "$1")), l = e.toLowerCase(), e = l in t || e == "onFocusOut" || e == "onFocusIn" ? l.slice(2) : e.slice(2), t.l || (t.l = {}), t.l[e + o] = n, n ? i ? n.u = i.u : (n.u = Ae, t.addEventListener(e, o ? Ie : Te, o)) : t.removeEventListener(e, o ? Ie : Te, o);
  else {
    if (r == "http://www.w3.org/2000/svg") e = e.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
    else if (e != "width" && e != "height" && e != "href" && e != "list" && e != "form" && e != "tabIndex" && e != "download" && e != "rowSpan" && e != "colSpan" && e != "role" && e != "popover" && e in t) try {
      t[e] = n ?? "";
      break e;
    } catch {
    }
    typeof n == "function" || (n == null || n === !1 && e[4] != "-" ? t.removeAttribute(e) : t.setAttribute(e, e == "popover" && n == 1 ? "" : n));
  }
}
function je(t) {
  return function(e) {
    if (this.l) {
      var n = this.l[e.type + t];
      if (e.t == null) e.t = Ae++;
      else if (e.t < n.u) return;
      return n(m.event ? m.event(e) : e);
    }
  };
}
function Re(t, e, n, i, r, o, l, a, f, c) {
  var d, s, p, _, h, $, b, y, g, U, L, Y, We, re, we, O = e.type;
  if (e.constructor !== void 0) return null;
  128 & n.__u && (f = !!(32 & n.__u), o = [a = e.__e = n.__e]), (d = m.__b) && d(e);
  e: if (typeof O == "function") try {
    if (y = e.props, g = "prototype" in O && O.prototype.render, U = (d = O.contextType) && i[d.__c], L = d ? U ? U.props.value : d.__ : i, n.__c ? b = (s = e.__c = n.__c).__ = s.__E : (g ? e.__c = s = new O(y, L) : (e.__c = s = new X(y, L), s.constructor = O, s.render = Lt), U && U.sub(s), s.state || (s.state = {}), s.__n = i, p = s.__d = !0, s.__h = [], s._sb = []), g && s.__s == null && (s.__s = s.state), g && O.getDerivedStateFromProps != null && (s.__s == s.state && (s.__s = R({}, s.__s)), R(s.__s, O.getDerivedStateFromProps(y, s.__s))), _ = s.props, h = s.state, s.__v = e, p) g && O.getDerivedStateFromProps == null && s.componentWillMount != null && s.componentWillMount(), g && s.componentDidMount != null && s.__h.push(s.componentDidMount);
    else {
      if (g && O.getDerivedStateFromProps == null && y !== _ && s.componentWillReceiveProps != null && s.componentWillReceiveProps(y, L), e.__v == n.__v || !s.__e && s.shouldComponentUpdate != null && s.shouldComponentUpdate(y, s.__s, L) === !1) {
        e.__v != n.__v && (s.props = y, s.state = s.__s, s.__d = !1), e.__e = n.__e, e.__k = n.__k, e.__k.some(function(B) {
          B && (B.__ = e);
        }), fe.push.apply(s.__h, s._sb), s._sb = [], s.__h.length && l.push(s);
        break e;
      }
      s.componentWillUpdate != null && s.componentWillUpdate(y, s.__s, L), g && s.componentDidUpdate != null && s.__h.push(function() {
        s.componentDidUpdate(_, h, $);
      });
    }
    if (s.context = L, s.props = y, s.__P = t, s.__e = !1, Y = m.__r, We = 0, g) s.state = s.__s, s.__d = !1, Y && Y(e), d = s.render(s.props, s.state, s.context), fe.push.apply(s.__h, s._sb), s._sb = [];
    else do
      s.__d = !1, Y && Y(e), d = s.render(s.props, s.state, s.context), s.state = s.__s;
    while (s.__d && ++We < 25);
    s.state = s.__s, s.getChildContext != null && (i = R(R({}, i), s.getChildContext())), g && !p && s.getSnapshotBeforeUpdate != null && ($ = s.getSnapshotBeforeUpdate(_, h)), re = d != null && d.type === H && d.key == null ? pt(d.props.children) : d, a = ft(t, be(re) ? re : [re], e, n, i, r, o, l, a, f, c), s.base = e.__e, e.__u &= -161, s.__h.length && l.push(s), b && (s.__E = s.__ = null);
  } catch (B) {
    if (e.__v = null, f || o != null) if (B.then) {
      for (e.__u |= f ? 160 : 128; a && a.nodeType == 8 && a.nextSibling; ) a = a.nextSibling;
      o[o.indexOf(a)] = null, e.__e = a;
    } else {
      for (we = o.length; we--; ) Me(o[we]);
      Ce(e);
    }
    else e.__e = n.__e, e.__k = n.__k, B.then || Ce(e);
    m.__e(B, e, n);
  }
  else o == null && e.__v == n.__v ? (e.__k = n.__k, e.__e = n.__e) : a = e.__e = zt(n.__e, e, n, i, r, o, l, f, c);
  return (d = m.diffed) && d(e), 128 & e.__u ? void 0 : a;
}
function Ce(t) {
  t && (t.__c && (t.__c.__e = !0), t.__k && t.__k.some(Ce));
}
function dt(t, e, n) {
  for (var i = 0; i < n.length; i++) Ue(n[i], n[++i], n[++i]);
  m.__c && m.__c(e, t), t.some(function(r) {
    try {
      t = r.__h, r.__h = [], t.some(function(o) {
        o.call(r);
      });
    } catch (o) {
      m.__e(o, r.__v);
    }
  });
}
function pt(t) {
  return typeof t != "object" || t == null || t.__b > 0 ? t : be(t) ? t.map(pt) : R({}, t);
}
function zt(t, e, n, i, r, o, l, a, f) {
  var c, d, s, p, _, h, $, b = n.props || ue, y = e.props, g = e.type;
  if (g == "svg" ? r = "http://www.w3.org/2000/svg" : g == "math" ? r = "http://www.w3.org/1998/Math/MathML" : r || (r = "http://www.w3.org/1999/xhtml"), o != null) {
    for (c = 0; c < o.length; c++) if ((_ = o[c]) && "setAttribute" in _ == !!g && (g ? _.localName == g : _.nodeType == 3)) {
      t = _, o[c] = null;
      break;
    }
  }
  if (t == null) {
    if (g == null) return document.createTextNode(y);
    t = document.createElementNS(r, g, y.is && y), a && (m.__m && m.__m(e, o), a = !1), o = null;
  }
  if (g == null) b === y || a && t.data == y || (t.data = y);
  else {
    if (o = o && ye.call(t.childNodes), !a && o != null) for (b = {}, c = 0; c < t.attributes.length; c++) b[(_ = t.attributes[c]).name] = _.value;
    for (c in b) _ = b[c], c == "dangerouslySetInnerHTML" ? s = _ : c == "children" || c in y || c == "value" && "defaultValue" in y || c == "checked" && "defaultChecked" in y || se(t, c, null, _, r);
    for (c in y) _ = y[c], c == "children" ? p = _ : c == "dangerouslySetInnerHTML" ? d = _ : c == "value" ? h = _ : c == "checked" ? $ = _ : a && typeof _ != "function" || b[c] === _ || se(t, c, _, b[c], r);
    if (d) a || s && (d.__html == s.__html || d.__html == t.innerHTML) || (t.innerHTML = d.__html), e.__k = [];
    else if (s && (t.innerHTML = ""), ft(e.type == "template" ? t.content : t, be(p) ? p : [p], e, n, i, g == "foreignObject" ? "http://www.w3.org/1999/xhtml" : r, o, l, o ? o[0] : n.__k && q(n, 0), a, f), o != null) for (c = o.length; c--; ) Me(o[c]);
    a || (c = "value", g == "progress" && h == null ? t.removeAttribute("value") : h != null && (h !== t[c] || g == "progress" && !h || g == "option" && h != b[c]) && se(t, c, h, b[c], r), c = "checked", $ != null && $ != t[c] && se(t, c, $, b[c], r));
  }
  return t;
}
function Ue(t, e, n) {
  try {
    if (typeof t == "function") {
      var i = typeof t.__u == "function";
      i && t.__u(), i && e == null || (t.__u = t(e));
    } else t.current = e;
  } catch (r) {
    m.__e(r, n);
  }
}
function ht(t, e, n) {
  var i, r;
  if (m.unmount && m.unmount(t), (i = t.ref) && (i.current && i.current != t.__e || Ue(i, null, e)), (i = t.__c) != null) {
    if (i.componentWillUnmount) try {
      i.componentWillUnmount();
    } catch (o) {
      m.__e(o, e);
    }
    i.base = i.__P = null;
  }
  if (i = t.__k) for (r = 0; r < i.length; r++) i[r] && ht(i[r], e, n || typeof t.type != "function");
  n || Me(t.__e), t.__c = t.__ = t.__e = void 0;
}
function Lt(t, e, n) {
  return this.constructor(t, n);
}
function vt(t, e, n) {
  var i, r, o, l;
  e == document && (e = document.documentElement), m.__ && m.__(t, e), r = (i = !1) ? null : e.__k, o = [], l = [], Re(e, t = e.__k = ct(H, null, [t]), r || ue, ue, e.namespaceURI, r ? null : e.firstChild ? ye.call(e.childNodes) : null, o, r ? r.__e : e.firstChild, i, l), dt(o, t, l);
}
ye = fe.slice, m = { __e: function(t, e, n, i) {
  for (var r, o, l; e = e.__; ) if ((r = e.__c) && !r.__) try {
    if ((o = r.constructor) && o.getDerivedStateFromError != null && (r.setState(o.getDerivedStateFromError(t)), l = r.__d), r.componentDidCatch != null && (r.componentDidCatch(t, i || {}), l = r.__d), l) return r.__E = r;
  } catch (a) {
    t = a;
  }
  throw t;
} }, ot = 0, rt = function(t) {
  return t != null && t.constructor === void 0;
}, X.prototype.setState = function(t, e) {
  var n;
  n = this.__s != null && this.__s != this.state ? this.__s : this.__s = R({}, this.state), typeof t == "function" && (t = t(R({}, n), this.props)), t && R(n, t), t != null && this.__v && (e && this._sb.push(e), Ve(this));
}, X.prototype.forceUpdate = function(t) {
  this.__v && (this.__e = !0, t && this.__h.push(t), Ve(this));
}, X.prototype.render = H, F = [], st = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, lt = function(t, e) {
  return t.__v.__b - e.__v.__b;
}, _e.__r = 0, at = /(PointerCapture)$|Capture$/i, Ae = 0, Te = je(!1), Ie = je(!0);
var Ft = 0;
function u(t, e, n, i, r, o) {
  e || (e = {});
  var l, a, f = e;
  if ("ref" in f) for (a in f = {}, e) a == "ref" ? l = e[a] : f[a] = e[a];
  var c = { type: t, props: f, key: n, ref: l, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --Ft, __i: -1, __u: 0, __source: r, __self: o };
  if (typeof t == "function" && (l = t.defaultProps)) for (a in l) f[a] === void 0 && (f[a] = l[a]);
  return m.vnode && m.vnode(c), c;
}
var ne, x, ke, Ge, de = 0, mt = [], w = m, Ke = w.__b, Je = w.__r, Ye = w.diffed, Ze = w.__c, Qe = w.unmount, Xe = w.__;
function De(t, e) {
  w.__h && w.__h(x, t, de || e), de = 0;
  var n = x.__H || (x.__H = { __: [], __h: [] });
  return t >= n.__.length && n.__.push({}), n.__[t];
}
function M(t) {
  return de = 1, Wt(yt, t);
}
function Wt(t, e, n) {
  var i = De(ne++, 2);
  if (i.t = t, !i.__c && (i.__ = [yt(void 0, e), function(a) {
    var f = i.__N ? i.__N[0] : i.__[0], c = i.t(f, a);
    f !== c && (i.__N = [c, i.__[1]], i.__c.setState({}));
  }], i.__c = x, !x.__f)) {
    var r = function(a, f, c) {
      if (!i.__c.__H) return !0;
      var d = i.__c.__H.__.filter(function(p) {
        return p.__c;
      });
      if (d.every(function(p) {
        return !p.__N;
      })) return !o || o.call(this, a, f, c);
      var s = i.__c.props !== a;
      return d.some(function(p) {
        if (p.__N) {
          var _ = p.__[0];
          p.__ = p.__N, p.__N = void 0, _ !== p.__[0] && (s = !0);
        }
      }), o && o.call(this, a, f, c) || s;
    };
    x.__f = !0;
    var o = x.shouldComponentUpdate, l = x.componentWillUpdate;
    x.componentWillUpdate = function(a, f, c) {
      if (this.__e) {
        var d = o;
        o = void 0, r(a, f, c), o = d;
      }
      l && l.call(this, a, f, c);
    }, x.shouldComponentUpdate = r;
  }
  return i.__N || i.__;
}
function Q(t, e) {
  var n = De(ne++, 3);
  !w.__s && gt(n.__H, e) && (n.__ = t, n.u = e, x.__H.__h.push(n));
}
function V(t) {
  return de = 5, He(function() {
    return { current: t };
  }, []);
}
function He(t, e) {
  var n = De(ne++, 7);
  return gt(n.__H, e) && (n.__ = t(), n.__H = e, n.__h = t), n.__;
}
function Bt() {
  for (var t; t = mt.shift(); ) {
    var e = t.__H;
    if (t.__P && e) try {
      e.__h.some(ce), e.__h.some(Ne), e.__h = [];
    } catch (n) {
      e.__h = [], w.__e(n, t.__v);
    }
  }
}
w.__b = function(t) {
  x = null, Ke && Ke(t);
}, w.__ = function(t, e) {
  t && e.__k && e.__k.__m && (t.__m = e.__k.__m), Xe && Xe(t, e);
}, w.__r = function(t) {
  Je && Je(t), ne = 0;
  var e = (x = t.__c).__H;
  e && (ke === x ? (e.__h = [], x.__h = [], e.__.some(function(n) {
    n.__N && (n.__ = n.__N), n.u = n.__N = void 0;
  })) : (e.__h.some(ce), e.__h.some(Ne), e.__h = [], ne = 0)), ke = x;
}, w.diffed = function(t) {
  Ye && Ye(t);
  var e = t.__c;
  e && e.__H && (e.__H.__h.length && (mt.push(e) !== 1 && Ge === w.requestAnimationFrame || ((Ge = w.requestAnimationFrame) || Vt)(Bt)), e.__H.__.some(function(n) {
    n.u && (n.__H = n.u), n.u = void 0;
  })), ke = x = null;
}, w.__c = function(t, e) {
  e.some(function(n) {
    try {
      n.__h.some(ce), n.__h = n.__h.filter(function(i) {
        return !i.__ || Ne(i);
      });
    } catch (i) {
      e.some(function(r) {
        r.__h && (r.__h = []);
      }), e = [], w.__e(i, n.__v);
    }
  }), Ze && Ze(t, e);
}, w.unmount = function(t) {
  Qe && Qe(t);
  var e, n = t.__c;
  n && n.__H && (n.__H.__.some(function(i) {
    try {
      ce(i);
    } catch (r) {
      e = r;
    }
  }), n.__H = void 0, e && w.__e(e, n.__v));
};
var et = typeof requestAnimationFrame == "function";
function Vt(t) {
  var e, n = function() {
    clearTimeout(i), et && cancelAnimationFrame(e), setTimeout(t);
  }, i = setTimeout(n, 35);
  et && (e = requestAnimationFrame(n));
}
function ce(t) {
  var e = x, n = t.__c;
  typeof n == "function" && (t.__c = void 0, n()), x = e;
}
function Ne(t) {
  var e = x;
  t.__c = t.__(), x = e;
}
function gt(t, e) {
  return !t || t.length !== e.length || e.some(function(n, i) {
    return n !== t[i];
  });
}
function yt(t, e) {
  return typeof e == "function" ? e(t) : e;
}
var qt = Symbol.for("preact-signals");
function xe() {
  if (D > 1)
    D--;
  else {
    for (var t, e = !1; ee !== void 0; ) {
      var n = ee;
      for (ee = void 0, Ee++; n !== void 0; ) {
        var i = n.o;
        if (n.o = void 0, n.f &= -3, !(8 & n.f) && wt(n)) try {
          n.c();
        } catch (r) {
          e || (t = r, e = !0);
        }
        n = i;
      }
    }
    if (Ee = 0, D--, e) throw t;
  }
}
function jt(t) {
  if (D > 0) return t();
  D++;
  try {
    return t();
  } finally {
    xe();
  }
}
var v = void 0;
function bt(t) {
  var e = v;
  v = void 0;
  try {
    return t();
  } finally {
    v = e;
  }
}
var ee = void 0, D = 0, Ee = 0, pe = 0;
function xt(t) {
  if (v !== void 0) {
    var e = t.n;
    if (e === void 0 || e.t !== v)
      return e = { i: 0, S: t, p: v.s, n: void 0, t: v, e: void 0, x: void 0, r: e }, v.s !== void 0 && (v.s.n = e), v.s = e, t.n = e, 32 & v.f && t.S(e), e;
    if (e.i === -1)
      return e.i = 0, e.n !== void 0 && (e.n.p = e.p, e.p !== void 0 && (e.p.n = e.n), e.p = v.s, e.n = void 0, v.s.n = e, v.s = e), e;
  }
}
function S(t, e) {
  this.v = t, this.i = 0, this.n = void 0, this.t = void 0, this.W = e?.watched, this.Z = e?.unwatched, this.name = e?.name;
}
S.prototype.brand = qt;
S.prototype.h = function() {
  return !0;
};
S.prototype.S = function(t) {
  var e = this, n = this.t;
  n !== t && t.e === void 0 && (t.x = n, this.t = t, n !== void 0 ? n.e = t : bt(function() {
    var i;
    (i = e.W) == null || i.call(e);
  }));
};
S.prototype.U = function(t) {
  var e = this;
  if (this.t !== void 0) {
    var n = t.e, i = t.x;
    n !== void 0 && (n.x = i, t.e = void 0), i !== void 0 && (i.e = n, t.x = void 0), t === this.t && (this.t = i, i === void 0 && bt(function() {
      var r;
      (r = e.Z) == null || r.call(e);
    }));
  }
};
S.prototype.subscribe = function(t) {
  var e = this;
  return ie(function() {
    var n = e.value, i = v;
    v = void 0;
    try {
      t(n);
    } finally {
      v = i;
    }
  }, { name: "sub" });
};
S.prototype.valueOf = function() {
  return this.value;
};
S.prototype.toString = function() {
  return this.value + "";
};
S.prototype.toJSON = function() {
  return this.value;
};
S.prototype.peek = function() {
  var t = v;
  v = void 0;
  try {
    return this.value;
  } finally {
    v = t;
  }
};
Object.defineProperty(S.prototype, "value", { get: function() {
  var t = xt(this);
  return t !== void 0 && (t.i = this.i), this.v;
}, set: function(t) {
  if (t !== this.v) {
    if (Ee > 100) throw new Error("Cycle detected");
    this.v = t, this.i++, pe++, D++;
    try {
      for (var e = this.t; e !== void 0; e = e.x) e.t.N();
    } finally {
      xe();
    }
  }
} });
function C(t, e) {
  return new S(t, e);
}
function wt(t) {
  for (var e = t.s; e !== void 0; e = e.n) if (e.S.i !== e.i || !e.S.h() || e.S.i !== e.i) return !0;
  return !1;
}
function kt(t) {
  for (var e = t.s; e !== void 0; e = e.n) {
    var n = e.S.n;
    if (n !== void 0 && (e.r = n), e.S.n = e, e.i = -1, e.n === void 0) {
      t.s = e;
      break;
    }
  }
}
function $t(t) {
  for (var e = t.s, n = void 0; e !== void 0; ) {
    var i = e.p;
    e.i === -1 ? (e.S.U(e), i !== void 0 && (i.n = e.n), e.n !== void 0 && (e.n.p = i)) : n = e, e.S.n = e.r, e.r !== void 0 && (e.r = void 0), e = i;
  }
  t.s = n;
}
function W(t, e) {
  S.call(this, void 0), this.x = t, this.s = void 0, this.g = pe - 1, this.f = 4, this.W = e?.watched, this.Z = e?.unwatched, this.name = e?.name;
}
W.prototype = new S();
W.prototype.h = function() {
  if (this.f &= -3, 1 & this.f) return !1;
  if ((36 & this.f) == 32 || (this.f &= -5, this.g === pe)) return !0;
  if (this.g = pe, this.f |= 1, this.i > 0 && !wt(this))
    return this.f &= -2, !0;
  var t = v;
  try {
    kt(this), v = this;
    var e = this.x();
    (16 & this.f || this.v !== e || this.i === 0) && (this.v = e, this.f &= -17, this.i++);
  } catch (n) {
    this.v = n, this.f |= 16, this.i++;
  }
  return v = t, $t(this), this.f &= -2, !0;
};
W.prototype.S = function(t) {
  if (this.t === void 0) {
    this.f |= 36;
    for (var e = this.s; e !== void 0; e = e.n) e.S.S(e);
  }
  S.prototype.S.call(this, t);
};
W.prototype.U = function(t) {
  if (this.t !== void 0 && (S.prototype.U.call(this, t), this.t === void 0)) {
    this.f &= -33;
    for (var e = this.s; e !== void 0; e = e.n) e.S.U(e);
  }
};
W.prototype.N = function() {
  if (!(2 & this.f)) {
    this.f |= 6;
    for (var t = this.t; t !== void 0; t = t.x) t.t.N();
  }
};
Object.defineProperty(W.prototype, "value", { get: function() {
  if (1 & this.f) throw new Error("Cycle detected");
  var t = xt(this);
  if (this.h(), t !== void 0 && (t.i = this.i), 16 & this.f) throw this.v;
  return this.v;
} });
function he(t, e) {
  return new W(t, e);
}
function St(t) {
  var e = t.u;
  if (t.u = void 0, typeof e == "function") {
    D++;
    var n = v;
    v = void 0;
    try {
      e();
    } catch (i) {
      throw t.f &= -2, t.f |= 8, ze(t), i;
    } finally {
      v = n, xe();
    }
  }
}
function ze(t) {
  for (var e = t.s; e !== void 0; e = e.n) e.S.U(e);
  t.x = void 0, t.s = void 0, St(t);
}
function Gt(t) {
  if (v !== this) throw new Error("Out-of-order effect");
  $t(this), v = t, this.f &= -2, 8 & this.f && ze(this), xe();
}
function G(t, e) {
  this.x = t, this.u = void 0, this.s = void 0, this.o = void 0, this.f = 32, this.name = e?.name;
}
G.prototype.c = function() {
  var t = this.S();
  try {
    if (8 & this.f || this.x === void 0) return;
    var e = this.x();
    typeof e == "function" && (this.u = e);
  } finally {
    t();
  }
};
G.prototype.S = function() {
  if (1 & this.f) throw new Error("Cycle detected");
  this.f |= 1, this.f &= -9, St(this), kt(this), D++;
  var t = v;
  return v = this, Gt.bind(this, t);
};
G.prototype.N = function() {
  2 & this.f || (this.f |= 2, this.o = ee, ee = this);
};
G.prototype.d = function() {
  this.f |= 8, 1 & this.f || ze(this);
};
G.prototype.dispose = function() {
  this.d();
};
function ie(t, e) {
  var n = new G(t, e);
  try {
    n.c();
  } catch (r) {
    throw n.d(), r;
  }
  var i = n.d.bind(n);
  return i[Symbol.dispose] = i, i;
}
var Tt, le, Kt = typeof window < "u" && !!window.__PREACT_SIGNALS_DEVTOOLS__, It = [];
ie(function() {
  Tt = this.N;
})();
function K(t, e) {
  m[t] = e.bind(null, m[t] || function() {
  });
}
function ve(t) {
  if (le) {
    var e = le;
    le = void 0, e();
  }
  le = t && t.S();
}
function Ct(t) {
  var e = this, n = t.data, i = Nt(n);
  i.value = n;
  var r = He(function() {
    for (var a = e, f = e.__v; f = f.__; ) if (f.__c) {
      f.__c.__$f |= 4;
      break;
    }
    var c = he(function() {
      var _ = i.value.value;
      return _ === 0 ? 0 : _ === !0 ? "" : _ || "";
    }), d = he(function() {
      return !Array.isArray(c.value) && !rt(c.value);
    }), s = ie(function() {
      if (this.N = Et, d.value) {
        var _ = c.value;
        a.__v && a.__v.__e && a.__v.__e.nodeType === 3 && (a.__v.__e.data = _);
      }
    }), p = e.__$u.d;
    return e.__$u.d = function() {
      s(), p.call(this);
    }, [d, c];
  }, []), o = r[0], l = r[1];
  return o.value ? l.peek() : l.value;
}
Ct.displayName = "ReactiveTextNode";
Object.defineProperties(S.prototype, { constructor: { configurable: !0, value: void 0 }, type: { configurable: !0, value: Ct }, props: { configurable: !0, get: function() {
  return { data: this };
} }, __b: { configurable: !0, value: 1 } });
K("__b", function(t, e) {
  if (typeof e.type == "string") {
    var n, i = e.props;
    for (var r in i) if (r !== "children") {
      var o = i[r];
      o instanceof S && (n || (e.__np = n = {}), n[r] = o, i[r] = o.peek());
    }
  }
  t(e);
});
K("__r", function(t, e) {
  if (t(e), e.type !== H) {
    ve();
    var n, i = e.__c;
    i && (i.__$f &= -2, (n = i.__$u) === void 0 && (i.__$u = n = (function(r, o) {
      var l;
      return ie(function() {
        l = this;
      }, { name: o }), l.c = r, l;
    })(function() {
      var r;
      Kt && ((r = n.y) == null || r.call(n)), i.__$f |= 1, i.setState({});
    }, typeof e.type == "function" ? e.type.displayName || e.type.name : ""))), ve(n);
  }
});
K("__e", function(t, e, n, i) {
  ve(), t(e, n, i);
});
K("diffed", function(t, e) {
  ve();
  var n;
  if (typeof e.type == "string" && (n = e.__e)) {
    var i = e.__np, r = e.props;
    if (i) {
      var o = n.U;
      if (o) for (var l in o) {
        var a = o[l];
        a !== void 0 && !(l in i) && (a.d(), o[l] = void 0);
      }
      else
        o = {}, n.U = o;
      for (var f in i) {
        var c = o[f], d = i[f];
        c === void 0 ? (c = Jt(n, f, d), o[f] = c) : c.o(d, r);
      }
      for (var s in i) r[s] = i[s];
    }
  }
  t(e);
});
function Jt(t, e, n, i) {
  var r = e in t && t.ownerSVGElement === void 0, o = C(n), l = n.peek();
  return { o: function(a, f) {
    o.value = a, l = a.peek();
  }, d: ie(function() {
    this.N = Et;
    var a = o.value.value;
    l !== a ? (l = void 0, r ? t[e] = a : a != null && (a !== !1 || e[4] === "-") ? t.setAttribute(e, a) : t.removeAttribute(e)) : l = void 0;
  }) };
}
K("unmount", function(t, e) {
  if (typeof e.type == "string") {
    var n = e.__e;
    if (n) {
      var i = n.U;
      if (i) {
        n.U = void 0;
        for (var r in i) {
          var o = i[r];
          o && o.d();
        }
      }
    }
    e.__np = void 0;
  } else {
    var l = e.__c;
    if (l) {
      var a = l.__$u;
      a && (l.__$u = void 0, a.d());
    }
  }
  t(e);
});
K("__h", function(t, e, n, i) {
  (i < 3 || i === 9) && (e.__$f |= 2), t(e, n, i);
});
X.prototype.shouldComponentUpdate = function(t, e) {
  if (this.__R) return !0;
  var n = this.__$u, i = n && n.s !== void 0;
  for (var r in e) return !0;
  if (this.__f || typeof this.u == "boolean" && this.u === !0) {
    var o = 2 & this.__$f;
    if (!(i || o || 4 & this.__$f) || 1 & this.__$f) return !0;
  } else if (!(i || 4 & this.__$f) || 3 & this.__$f) return !0;
  for (var l in t) if (l !== "__source" && t[l] !== this.props[l]) return !0;
  for (var a in this.props) if (!(a in t)) return !0;
  return !1;
};
function Nt(t, e) {
  return He(function() {
    return C(t, e);
  }, []);
}
var Yt = function(t) {
  queueMicrotask(function() {
    queueMicrotask(t);
  });
};
function Zt() {
  jt(function() {
    for (var t; t = It.shift(); ) Tt.call(t);
  });
}
function Et() {
  It.push(this) === 1 && (m.requestAnimationFrame || Yt)(Zt);
}
const N = C(!1), tt = C(!1), T = C([]), k = C(null), j = C(null), P = C(null), z = C(null), Z = C(""), me = C(!1), ge = C(!1), I = C({
  primaryColor: "#3ECF8E",
  position: "bottom-right",
  welcomeMessage: "Hi! How can we help you?",
  workspaceName: null,
  showBranding: !0,
  requireEmail: !1,
  pusherKey: null,
  pusherCluster: null,
  offlineFormTimeout: null,
  pageVisibilityMode: "exclude",
  pageVisibilityPatterns: []
}), Pt = C(!1), Qt = he(
  () => I.value.requireEmail && !z.value && !k.value
), Xt = he(() => !!k.value), Ot = "guddesk_state";
function Le() {
  try {
    localStorage.setItem(
      Ot,
      JSON.stringify({
        conversationId: k.value,
        visitorId: j.value,
        visitorToken: P.value,
        visitorEmail: z.value
      })
    );
  } catch {
  }
}
function en() {
  try {
    const t = localStorage.getItem(Ot);
    if (!t) return;
    const e = JSON.parse(t);
    e.conversationId && (k.value = e.conversationId), e.visitorId && (j.value = e.visitorId), e.visitorToken && (P.value = e.visitorToken), e.visitorEmail && (z.value = e.visitorEmail);
  } catch {
  }
}
let oe = "", At = "";
function tn(t, e) {
  oe = t, At = e.replace(/\/$/, "");
}
async function J(t, e = {}) {
  const n = {
    "Content-Type": "application/json",
    ...e.headers
  };
  P.value && (n["x-visitor-token"] = P.value);
  const i = await fetch(`${At}${t}`, { ...e, headers: n });
  if (!i.ok) {
    const r = await i.json().catch(() => ({ error: "Request failed" }));
    throw new Error(r.error || "Request failed");
  }
  return i.json();
}
async function nn() {
  const t = await J(
    `/api/widget/config?appId=${encodeURIComponent(oe)}`
  );
  I.value = t, Pt.value = !0;
}
async function on() {
  if (P.value && j.value) return;
  const t = await J(
    "/api/widget/auth",
    { method: "POST", body: JSON.stringify({ appId: oe }) }
  );
  j.value = t.visitorId, P.value = t.visitorToken, Le();
}
async function Fe(t) {
  const e = await J(
    "/api/widget/visitors",
    {
      method: "POST",
      body: JSON.stringify({
        appId: oe,
        visitorToken: P.value,
        externalId: t.userId,
        name: t.name,
        email: t.email,
        metadata: t.metadata
      })
    }
  );
  j.value = e.visitorId, P.value = e.visitorToken, t.email && (z.value = t.email), Le();
}
let rn = 0;
function Mt(t) {
  const e = `_opt_${++rn}`, n = {
    id: e,
    body: t,
    type: "VISITOR",
    senderName: null,
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    _sending: !0
  };
  return T.value = [...T.value, n], e;
}
function Pe(t, e) {
  e ? T.value = T.value.map((n) => n.id === t ? e : n) : T.value = T.value.map(
    (n) => n.id === t ? { ...n, _sending: !1 } : n
  );
}
async function sn(t) {
  const e = Mt(t);
  try {
    const n = await J("/api/widget/conversations", {
      method: "POST",
      body: JSON.stringify({
        appId: oe,
        visitorToken: P.value,
        message: t,
        visitorName: null,
        visitorEmail: z.value
      })
    });
    k.value = n.conversationId, j.value = n.visitorId, P.value = n.visitorToken, T.value = n.messages, Le();
  } catch {
    Pe(e, null);
  }
}
async function ln(t) {
  if (!k.value)
    return sn(t);
  const e = Mt(t);
  try {
    const n = await J(
      `/api/widget/conversations/${k.value}/messages`,
      { method: "POST", body: JSON.stringify({ message: t }) }
    );
    Pe(e, n);
  } catch {
    Pe(e, null);
  }
}
async function $e() {
  if (!k.value) return;
  const t = await J(
    `/api/widget/conversations/${k.value}/messages`
  );
  T.value = t.messages;
}
function an(t) {
  const e = t.replace(/([.+?^${}()|[\]\\])/g, "\\$1").replace(/\*\*/g, "{{GLOBSTAR}}").replace(/\*/g, "[^/]*").replace(/\{\{GLOBSTAR\}\}/g, ".*");
  return new RegExp(`^${e}$`);
}
function cn(t, e, n) {
  if (!n || n.length === 0) return !0;
  const i = n.some((r) => {
    try {
      return an(r).test(t);
    } catch {
      return !1;
    }
  });
  return e === "exclude" ? !i : i;
}
let A = null, E = null;
async function un(t, e, n) {
  const { default: i } = await import("pusher-js");
  return A = new i(t, {
    cluster: e,
    channelAuthorization: {
      endpoint: n,
      transport: "ajax",
      headers: {
        "x-visitor-token": P.value ?? ""
      }
    }
  }), A;
}
function nt() {
  if (!A || !k.value) return;
  E && (E.unbind_all(), A.unsubscribe(E.name));
  const t = `presence-visitor-${k.value}`;
  E = A.subscribe(t), E.bind("message:created", (e) => {
    T.value.some((n) => n.id === e.id) || (T.value = [...T.value, e]);
  }), E.bind("typing:start", () => {
    me.value = !0;
  }), E.bind("typing:stop", () => {
    me.value = !1;
  });
}
function Se() {
  return !!A;
}
function fn() {
  E && (E.unbind_all(), A?.unsubscribe(E.name), E = null), A && (A.disconnect(), A = null);
}
function _n(t, e) {
  const n = e === "bottom-right";
  return `
    :host {
      all: initial;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      font-size: 14px;
      line-height: 1.5;
      color: #1f2937;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }

    .fc-container {
      position: fixed;
      bottom: 20px;
      ${n ? "right: 20px;" : "left: 20px;"}
      z-index: 2147483647;
      display: flex;
      flex-direction: column;
      align-items: ${n ? "flex-end" : "flex-start"};
    }

    .fc-bubble {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: ${t};
      color: white;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .fc-bubble:hover {
      transform: scale(1.05);
      box-shadow: 0 6px 20px rgba(0,0,0,0.2);
    }

    .fc-window {
      width: 370px;
      max-height: 520px;
      border-radius: 16px;
      overflow: hidden;
      background: white;
      box-shadow: 0 8px 30px rgba(0,0,0,0.12);
      display: flex;
      flex-direction: column;
      margin-bottom: 12px;
      animation: fc-slide-up 0.25s ease-out;
    }

    @keyframes fc-slide-up {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .fc-header {
      background: ${t};
      color: white;
      padding: 16px;
    }
    .fc-header-title {
      font-size: 15px;
      font-weight: 600;
    }
    .fc-header-subtitle {
      font-size: 12px;
      opacity: 0.85;
      margin-top: 2px;
    }
    .fc-header-close {
      position: absolute;
      top: 12px;
      right: 12px;
      background: none;
      border: none;
      color: white;
      cursor: pointer;
      opacity: 0.8;
      padding: 4px;
    }
    .fc-header-close:hover { opacity: 1; }

    .fc-messages {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      min-height: 200px;
      max-height: 320px;
    }

    .fc-msg-row {
      display: flex;
      flex-direction: column;
    }
    .fc-msg-row-visitor {
      align-items: flex-end;
    }
    .fc-msg-row-agent {
      align-items: flex-start;
    }

    .fc-msg {
      max-width: 80%;
      padding: 8px 12px;
      border-radius: 12px;
      font-size: 13px;
      line-height: 1.4;
      word-wrap: break-word;
    }
    .fc-msg-visitor {
      background: ${t};
      color: white;
      border-bottom-right-radius: 4px;
    }
    .fc-msg-agent {
      background: #f3f4f6;
      color: #1f2937;
      border-bottom-left-radius: 4px;
    }
    .fc-msg-sender {
      font-size: 11px;
      color: #6b7280;
      margin-bottom: 2px;
    }
    .fc-msg-time {
      font-size: 10px;
      opacity: 0.6;
      margin-top: 2px;
    }
    .fc-msg-sending {
      opacity: 0.7;
    }
    .fc-sending-indicator {
      display: inline-flex;
      gap: 2px;
      align-items: center;
    }
    .fc-sending-dot {
      width: 3px;
      height: 3px;
      border-radius: 50%;
      background: currentColor;
      opacity: 0.5;
      animation: fc-sending-pulse 1s infinite;
    }
    .fc-sending-dot:nth-child(2) { animation-delay: 0.15s; }
    .fc-sending-dot:nth-child(3) { animation-delay: 0.3s; }
    @keyframes fc-sending-pulse {
      0%, 100% { opacity: 0.3; }
      50% { opacity: 1; }
    }

    .fc-typing {
      align-self: flex-start;
      padding: 8px 12px;
      background: #f3f4f6;
      border-radius: 12px;
      font-size: 13px;
      color: #6b7280;
    }
    .fc-typing-dots span {
      animation: fc-blink 1.4s infinite both;
    }
    .fc-typing-dots span:nth-child(2) { animation-delay: 0.2s; }
    .fc-typing-dots span:nth-child(3) { animation-delay: 0.4s; }
    @keyframes fc-blink {
      0%, 80%, 100% { opacity: 0.3; }
      40% { opacity: 1; }
    }

    .fc-input-area {
      border-top: 1px solid #e5e7eb;
      padding: 12px;
      display: flex;
      gap: 8px;
      align-items: flex-end;
    }
    .fc-input {
      flex: 1;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 8px 12px;
      font-size: 13px;
      font-family: inherit;
      outline: none;
      resize: none;
      min-height: 36px;
      max-height: 80px;
      line-height: 1.4;
    }
    .fc-input:focus {
      border-color: ${t};
    }
    .fc-send-btn {
      background: ${t};
      color: white;
      border: none;
      border-radius: 8px;
      padding: 8px 12px;
      cursor: pointer;
      font-size: 13px;
      font-weight: 500;
      white-space: nowrap;
    }
    .fc-send-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .fc-branding {
      text-align: center;
      padding: 6px;
      font-size: 10px;
      color: #9ca3af;
      border-top: 1px solid #f3f4f6;
    }
    .fc-branding a {
      color: #6b7280;
      text-decoration: none;
    }
    .fc-branding a:hover { text-decoration: underline; }

    .fc-prechat {
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .fc-prechat label {
      font-size: 13px;
      font-weight: 500;
      color: #374151;
    }
    .fc-prechat input {
      width: 100%;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 8px 12px;
      font-size: 13px;
      font-family: inherit;
      outline: none;
    }
    .fc-prechat input:focus {
      border-color: ${t};
    }
    .fc-prechat button {
      background: ${t};
      color: white;
      border: none;
      border-radius: 8px;
      padding: 10px;
      cursor: pointer;
      font-size: 13px;
      font-weight: 500;
    }

    .fc-offline-form {
      padding: 16px;
      animation: fc-slide-up 0.2s ease-out;
    }
    .fc-offline-header {
      margin-bottom: 12px;
    }
    .fc-offline-title {
      font-size: 14px;
      font-weight: 600;
      color: #1f2937;
    }
    .fc-offline-subtitle {
      font-size: 12px;
      color: #6b7280;
      margin-top: 2px;
    }
    .fc-offline-fields {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .fc-offline-field {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .fc-offline-field label {
      font-size: 12px;
      font-weight: 500;
      color: #374151;
    }
    .fc-offline-field input,
    .fc-offline-field textarea {
      width: 100%;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 8px 12px;
      font-size: 13px;
      font-family: inherit;
      outline: none;
      resize: none;
    }
    .fc-offline-field input:focus,
    .fc-offline-field textarea:focus {
      border-color: ${t};
    }
    .fc-offline-error {
      font-size: 12px;
      color: #ef4444;
    }
    .fc-offline-submit {
      background: ${t};
      color: white;
      border: none;
      border-radius: 8px;
      padding: 10px;
      cursor: pointer;
      font-size: 13px;
      font-weight: 500;
    }
    .fc-offline-submit:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .fc-offline-dismiss {
      background: none;
      border: none;
      color: #6b7280;
      font-size: 12px;
      cursor: pointer;
      text-align: center;
      padding: 6px;
      width: 100%;
    }
    .fc-offline-dismiss:hover {
      color: #374151;
    }
    .fc-offline-success {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 20px 0;
      gap: 8px;
    }
    .fc-offline-success-title {
      font-size: 14px;
      font-weight: 600;
      color: #1f2937;
    }
    .fc-offline-success-text {
      font-size: 12px;
      color: #6b7280;
      line-height: 1.4;
    }
    .fc-offline-success-text strong {
      color: #374151;
    }

    @media (max-width: 440px) {
      .fc-window {
        width: calc(100vw - 24px);
        max-height: calc(100vh - 100px);
        border-radius: 12px;
      }
      .fc-container {
        bottom: 12px;
        ${n ? "right: 12px;" : "left: 12px;"}
      }
    }
  `;
}
const dn = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>', pn = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>', hn = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>';
function vn() {
  return /* @__PURE__ */ u("div", { class: "fc-header", style: { position: "relative" }, children: [
    /* @__PURE__ */ u("div", { class: "fc-header-title", children: I.value.workspaceName || "Support" }),
    /* @__PURE__ */ u("div", { class: "fc-header-subtitle", children: "We typically reply in a few minutes" }),
    /* @__PURE__ */ u(
      "button",
      {
        class: "fc-header-close",
        onClick: () => N.value = !1,
        "aria-label": "Close chat",
        dangerouslySetInnerHTML: { __html: pn }
      }
    )
  ] });
}
function mn(t) {
  try {
    return new Date(t).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } catch {
    return "";
  }
}
function it() {
  const t = V(null);
  return Q(() => {
    t.current?.scrollIntoView({ behavior: "smooth" });
  }, [T.value.length, me.value]), Xt.value ? /* @__PURE__ */ u("div", { class: "fc-messages", children: [
    T.value.map((e) => /* @__PURE__ */ u(
      "div",
      {
        class: `fc-msg-row ${e.type === "VISITOR" ? "fc-msg-row-visitor" : "fc-msg-row-agent"}`,
        children: [
          e.type !== "VISITOR" && e.senderName && /* @__PURE__ */ u("div", { class: "fc-msg-sender", children: e.senderName }),
          /* @__PURE__ */ u(
            "div",
            {
              class: `fc-msg ${e.type === "VISITOR" ? "fc-msg-visitor" : "fc-msg-agent"}${e._sending ? " fc-msg-sending" : ""}`,
              children: [
                e.body,
                /* @__PURE__ */ u("div", { class: "fc-msg-time", children: e._sending ? /* @__PURE__ */ u("span", { class: "fc-sending-indicator", children: [
                  /* @__PURE__ */ u("span", { class: "fc-sending-dot" }),
                  /* @__PURE__ */ u("span", { class: "fc-sending-dot" }),
                  /* @__PURE__ */ u("span", { class: "fc-sending-dot" })
                ] }) : mn(e.createdAt) })
              ]
            }
          )
        ]
      },
      e.id
    )),
    me.value && /* @__PURE__ */ u("div", { class: "fc-typing", children: /* @__PURE__ */ u("span", { class: "fc-typing-dots", children: [
      /* @__PURE__ */ u("span", { children: "." }),
      /* @__PURE__ */ u("span", { children: "." }),
      /* @__PURE__ */ u("span", { children: "." })
    ] }) }),
    /* @__PURE__ */ u("div", { ref: t })
  ] }) : /* @__PURE__ */ u("div", { class: "fc-messages", children: /* @__PURE__ */ u("div", { class: "fc-msg fc-msg-agent", children: I.value.welcomeMessage }) });
}
function gn() {
  const t = V(null);
  async function e() {
    const i = Z.value.trim();
    !i || tt.value || (Z.value = "", await ln(i), t.current?.focus());
  }
  function n(i) {
    i.key === "Enter" && !i.shiftKey && (i.preventDefault(), e());
  }
  return /* @__PURE__ */ u("div", { class: "fc-input-area", children: [
    /* @__PURE__ */ u(
      "textarea",
      {
        ref: t,
        class: "fc-input",
        rows: 1,
        placeholder: "Type a message...",
        value: Z.value,
        onInput: (i) => {
          Z.value = i.target.value;
        },
        onKeyDown: n
      }
    ),
    /* @__PURE__ */ u(
      "button",
      {
        class: "fc-send-btn",
        onClick: e,
        disabled: !Z.value.trim() || tt.value,
        children: "Send"
      }
    )
  ] });
}
function yn() {
  const [t, e] = M(""), [n, i] = M(""), [r, o] = M(!1);
  async function l(a) {
    a.preventDefault();
    const f = t.trim();
    if (!f || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f)) {
      i("Please enter a valid email address.");
      return;
    }
    o(!0), i("");
    try {
      await Fe({ email: f }), z.value = f;
    } catch {
      i("Something went wrong. Please try again.");
    } finally {
      o(!1);
    }
  }
  return /* @__PURE__ */ u("form", { class: "fc-prechat", onSubmit: l, children: [
    /* @__PURE__ */ u("label", { children: "Enter your email to start chatting" }),
    /* @__PURE__ */ u(
      "input",
      {
        type: "email",
        placeholder: "you@example.com",
        value: t,
        onInput: (a) => e(a.target.value),
        required: !0
      }
    ),
    n && /* @__PURE__ */ u("div", { style: { color: "#ef4444", fontSize: "12px" }, children: n }),
    /* @__PURE__ */ u("button", { type: "submit", disabled: r, children: r ? "..." : "Start Chat" })
  ] });
}
function bn() {
  const [t, e] = M(""), [n, i] = M(z.value ?? ""), [r, o] = M(""), [l, a] = M(!1), [f, c] = M(!1), [d, s] = M("");
  async function p(h) {
    h.preventDefault();
    const $ = n.trim();
    if (!$ || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($)) {
      s("Please enter a valid email address.");
      return;
    }
    c(!0), s("");
    try {
      await Fe({
        email: $,
        name: t.trim() || void 0
      }), z.value = $, a(!0);
    } catch {
      s("Something went wrong. Please try again.");
    } finally {
      c(!1);
    }
  }
  function _() {
    ge.value = !1;
  }
  return l ? /* @__PURE__ */ u("div", { class: "fc-offline-form", children: /* @__PURE__ */ u("div", { class: "fc-offline-success", children: [
    /* @__PURE__ */ u("svg", { width: "32", height: "32", viewBox: "0 0 24 24", fill: "none", stroke: I.value.primaryColor, "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", children: [
      /* @__PURE__ */ u("path", { d: "M22 11.08V12a10 10 0 1 1-5.93-9.14" }),
      /* @__PURE__ */ u("polyline", { points: "22 4 12 14.01 9 11.01" })
    ] }),
    /* @__PURE__ */ u("p", { class: "fc-offline-success-title", children: "Thanks! We'll be in touch." }),
    /* @__PURE__ */ u("p", { class: "fc-offline-success-text", children: [
      "We'll get back to you at ",
      /* @__PURE__ */ u("strong", { children: n }),
      " as soon as possible."
    ] }),
    /* @__PURE__ */ u("button", { class: "fc-offline-dismiss", onClick: _, children: "Continue chatting" })
  ] }) }) : /* @__PURE__ */ u("div", { class: "fc-offline-form", children: [
    /* @__PURE__ */ u("div", { class: "fc-offline-header", children: [
      /* @__PURE__ */ u("p", { class: "fc-offline-title", children: "We're not available right now" }),
      /* @__PURE__ */ u("p", { class: "fc-offline-subtitle", children: "Leave your details and we'll get back to you." })
    ] }),
    /* @__PURE__ */ u("form", { class: "fc-offline-fields", onSubmit: p, children: [
      /* @__PURE__ */ u("div", { class: "fc-offline-field", children: [
        /* @__PURE__ */ u("label", { children: "Name" }),
        /* @__PURE__ */ u(
          "input",
          {
            type: "text",
            placeholder: "Your name",
            value: t,
            onInput: (h) => e(h.target.value)
          }
        )
      ] }),
      /* @__PURE__ */ u("div", { class: "fc-offline-field", children: [
        /* @__PURE__ */ u("label", { children: "Email *" }),
        /* @__PURE__ */ u(
          "input",
          {
            type: "email",
            placeholder: "you@example.com",
            value: n,
            onInput: (h) => i(h.target.value),
            required: !0
          }
        )
      ] }),
      /* @__PURE__ */ u("div", { class: "fc-offline-field", children: [
        /* @__PURE__ */ u("label", { children: "Message" }),
        /* @__PURE__ */ u(
          "textarea",
          {
            placeholder: "Anything else you'd like us to know?",
            rows: 3,
            value: r,
            onInput: (h) => o(h.target.value)
          }
        )
      ] }),
      d && /* @__PURE__ */ u("div", { class: "fc-offline-error", children: d }),
      /* @__PURE__ */ u("button", { type: "submit", class: "fc-offline-submit", disabled: f, children: f ? "Sending..." : "Leave a message" }),
      /* @__PURE__ */ u("button", { type: "button", class: "fc-offline-dismiss", onClick: _, children: "Continue chatting" })
    ] })
  ] });
}
function xn() {
  return /* @__PURE__ */ u("div", { class: "fc-window", children: [
    /* @__PURE__ */ u(vn, {}),
    Qt.value ? /* @__PURE__ */ u(yn, {}) : ge.value ? /* @__PURE__ */ u(H, { children: [
      /* @__PURE__ */ u(it, {}),
      /* @__PURE__ */ u(bn, {})
    ] }) : /* @__PURE__ */ u(H, { children: [
      /* @__PURE__ */ u(it, {}),
      /* @__PURE__ */ u(gn, {})
    ] }),
    I.value.showBranding && /* @__PURE__ */ u("div", { class: "fc-branding", children: [
      "Powered by",
      " ",
      /* @__PURE__ */ u("a", { href: "https://guddesk.com", target: "_blank", rel: "noopener", children: "GudDesk" })
    ] })
  ] });
}
function wn() {
  return /* @__PURE__ */ u(
    "button",
    {
      class: "fc-bubble",
      onClick: () => N.value = !N.value,
      "aria-label": N.value ? "Close chat" : "Open chat",
      dangerouslySetInnerHTML: {
        __html: N.value ? hn : dn
      }
    }
  );
}
const kn = 4e3;
function $n({ appId: t, baseUrl: e, pusherKey: n, pusherCluster: i }) {
  const r = V(null), o = V(!1), l = V(null), a = V(0), f = Nt(!1);
  function c() {
    d(), r.current = setInterval(() => {
      k.value && N.value && $e().catch(() => {
      });
    }, kn);
  }
  function d() {
    r.current && (clearInterval(r.current), r.current = null);
  }
  async function s(p, _) {
    if (!o.current) {
      o.current = !0;
      try {
        await un(p, _, `${e}/api/pusher/auth`), k.value && nt(), d();
      } catch {
        o.current = !1, c();
      }
    }
  }
  return Q(() => (en(), tn(t, e), Promise.all([
    nn().catch(() => {
    }),
    on().catch(() => {
    })
  ]).then(() => {
    if (!cn(
      window.location.pathname,
      I.value.pageVisibilityMode,
      I.value.pageVisibilityPatterns
    )) {
      f.value = !0;
      return;
    }
    k.value && $e().catch(() => {
    });
    const _ = n || I.value.pusherKey, h = i || I.value.pusherCluster;
    _ && h ? s(_, h) : c();
  }), () => {
    fn(), d();
  }), []), Q(() => {
    k.value && (Se() ? nt() : r.current || c());
  }, [k.value]), Q(() => {
    N.value && k.value && !Se() ? ($e().catch(() => {
    }), c()) : !N.value && !Se() && d();
  }, [N.value]), Q(() => {
    const p = I.value.offlineFormTimeout;
    if (!p || !k.value) return;
    const _ = T.value, h = _.filter((b) => b.type === "VISITOR").length;
    if (_.some((b) => b.type === "AGENT" || b.type === "BOT")) {
      ge.value = !1, l.current && (clearTimeout(l.current), l.current = null), a.current = h;
      return;
    }
    return h > a.current && (a.current = h, l.current && clearTimeout(l.current), l.current = setTimeout(() => {
      T.value.some((g) => g.type === "AGENT" || g.type === "BOT") || (ge.value = !0);
    }, p * 60 * 1e3)), () => {
      l.current && (clearTimeout(l.current), l.current = null);
    };
  }, [T.value, k.value, I.value.offlineFormTimeout]), !Pt.value || f.value ? null : /* @__PURE__ */ u(H, { children: [
    /* @__PURE__ */ u("style", { children: _n(I.value.primaryColor, I.value.position) }),
    /* @__PURE__ */ u("div", { class: "fc-container", children: [
      N.value && /* @__PURE__ */ u(xn, {}),
      /* @__PURE__ */ u(wn, {})
    ] })
  ] });
}
let te = null;
function Sn() {
  const t = document.querySelectorAll("script[src]");
  for (let e = t.length - 1; e >= 0; e--) {
    const n = t[e].src;
    if (n.includes("guddesk") || n.includes("widget"))
      try {
        return new URL(n).origin;
      } catch {
      }
  }
  return window.location.origin;
}
function Oe(t) {
  if (te) return;
  const e = t.appId;
  if (!e) {
    console.error("[GudDesk] Missing appId in GudDeskSettings");
    return;
  }
  const n = t.baseUrl || Sn(), i = document.createElement("div");
  i.id = "guddesk-widget", document.body.appendChild(i), te = i.attachShadow({ mode: "open" }), vt(
    ct($n, {
      appId: e,
      baseUrl: n,
      pusherKey: t.pusherKey,
      pusherCluster: t.pusherCluster
    }),
    te
  );
}
function Tn() {
  const t = document.getElementById("guddesk-widget");
  t && (vt(null, te), t.remove(), te = null);
}
const In = {
  init: Oe,
  identify: (t) => Fe(t),
  open: () => {
    N.value = !0;
  },
  close: () => {
    N.value = !1;
  },
  destroy: Tn
};
window.GudDesk = In;
window.GudDeskSettings && (document.readyState === "loading" ? document.addEventListener(
  "DOMContentLoaded",
  () => Oe(window.GudDeskSettings)
) : Oe(window.GudDeskSettings));
export {
  In as default
};
