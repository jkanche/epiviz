var $jscomp = { scope: {} };
$jscomp.defineProperty = "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) { if (c.get || c.set) throw new TypeError("ES3 does not support getters and setters.");
    a != Array.prototype && a != Object.prototype && (a[b] = c.value) };
$jscomp.getGlobal = function(a) { return "undefined" != typeof window && window === a ? a : "undefined" != typeof global && null != global ? global : a };
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.SYMBOL_PREFIX = "jscomp_symbol_";
$jscomp.initSymbol = function() { $jscomp.initSymbol = function() {};
    $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol) };
$jscomp.symbolCounter_ = 0;
$jscomp.Symbol = function(a) { return $jscomp.SYMBOL_PREFIX + (a || "") + $jscomp.symbolCounter_++ };
$jscomp.initSymbolIterator = function() { $jscomp.initSymbol(); var a = $jscomp.global.Symbol.iterator;
    a || (a = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("iterator")); "function" != typeof Array.prototype[a] && $jscomp.defineProperty(Array.prototype, a, { configurable: !0, writable: !0, value: function() { return $jscomp.arrayIterator(this) } });
    $jscomp.initSymbolIterator = function() {} };
$jscomp.arrayIterator = function(a) { var b = 0; return $jscomp.iteratorPrototype(function() { return b < a.length ? { done: !1, value: a[b++] } : { done: !0 } }) };
$jscomp.iteratorPrototype = function(a) { $jscomp.initSymbolIterator();
    a = { next: a };
    a[$jscomp.global.Symbol.iterator] = function() { return this }; return a };
$jscomp.array = $jscomp.array || {};
$jscomp.iteratorFromArray = function(a, b) { $jscomp.initSymbolIterator();
    a instanceof String && (a += ""); var c = 0,
        d = { next: function() { if (c < a.length) { var e = c++; return { value: b(e, a[e]), done: !1 } }
                d.next = function() { return { done: !0, value: void 0 } }; return d.next() } };
    d[Symbol.iterator] = function() { return d }; return d };
$jscomp.polyfill = function(a, b, c, d) { if (b) { c = $jscomp.global;
        a = a.split("."); for (d = 0; d < a.length - 1; d++) { var e = a[d];
            e in c || (c[e] = {});
            c = c[e] }
        a = a[a.length - 1];
        d = c[a];
        b = b(d);
        b != d && null != b && $jscomp.defineProperty(c, a, { configurable: !0, writable: !0, value: b }) } };
$jscomp.polyfill("Array.prototype.keys", function(a) { return a ? a : function() { return $jscomp.iteratorFromArray(this, function(a) { return a }) } }, "es6-impl", "es3");
$jscomp.polyfill("Array.prototype.values", function(a) { return a ? a : function() { return $jscomp.iteratorFromArray(this, function(a, c) { return c }) } }, "es6", "es3");
$jscomp.checkStringArgs = function(a, b, c) { if (null == a) throw new TypeError("The 'this' value for String.prototype." + c + " must not be null or undefined"); if (b instanceof RegExp) throw new TypeError("First argument to String.prototype." + c + " must not be a regular expression"); return a + "" };
$jscomp.polyfill("String.prototype.includes", function(a) { return a ? a : function(a, c) { return -1 !== $jscomp.checkStringArgs(this, a, "includes").indexOf(a, c || 0) } }, "es6-impl", "es3");
$jscomp.findInternal = function(a, b, c) { a instanceof String && (a = String(a)); for (var d = a.length, e = 0; e < d; e++) { var f = a[e]; if (b.call(c, f, e, a)) return { i: e, v: f } } return { i: -1, v: void 0 } };
$jscomp.polyfill("Array.prototype.find", function(a) { return a ? a : function(a, c) { return $jscomp.findInternal(this, a, c).v } }, "es6-impl", "es3");
var epiviz = { deferred: {} };
epiviz.deferred.Deferred = function(a) { this._deferred = a || $.Deferred() };
epiviz.deferred.Deferred.State = { PENDING: "pending", RESOLVED: "resolved", REJECTED: "rejected" };
epiviz.deferred.Deferred.prototype.then = function(a, b, c) { return new epiviz.deferred.Promise(this._deferred.then(a, b, c)) };
epiviz.deferred.Deferred.prototype.done = function(a, b) { return new epiviz.deferred.Deferred(this._deferred.done(a, b)) };
epiviz.deferred.Deferred.prototype.fail = function(a, b) { return new epiviz.deferred.Deferred(this._deferred.fail(a, b)) };
epiviz.deferred.Deferred.prototype.always = function(a, b) { return new epiviz.deferred.Deferred(this._deferred.always(a, b)) };
epiviz.deferred.Deferred.prototype.state = function() { return this._deferred.state() };
epiviz.deferred.Deferred.prototype.notify = function(a) { return new epiviz.deferred.Deferred(this._deferred.notify(a)) };
epiviz.deferred.Deferred.prototype.notifyWith = function(a, b) { return new epiviz.deferred.Deferred(this._deferred.notifyWith(a, b)) };
epiviz.deferred.Deferred.prototype.progress = function(a, b) { return new epiviz.deferred.Deferred(this._deferred.progress(a, b)) };
epiviz.deferred.Deferred.prototype.promise = function(a) { return new epiviz.deferred.Promise(this._deferred.promise(a)) };
epiviz.deferred.Deferred.prototype.reject = function(a) { return new epiviz.deferred.Deferred(this._deferred.reject(a)) };
epiviz.deferred.Deferred.prototype.rejectWith = function(a, b) { return new epiviz.deferred.Deferred(this._deferred.rejectWith(a, b)) };
epiviz.deferred.Deferred.prototype.resolve = function(a) { return new epiviz.deferred.Deferred(this._deferred.resolve(a)) };
epiviz.deferred.Deferred.prototype.resolveWith = function(a, b) { return new epiviz.deferred.Deferred(this._deferred.resolveWith(a, b)) };
epiviz.utils = function() {};
epiviz.utils.capitalizeFirstLetter = function(a) { return a.charAt(0).toUpperCase() + a.slice(1) };
epiviz.utils.stringContains = function(a, b) { return -1 != a.indexOf(b) };
epiviz.utils.stringStartsWith = function(a, b) { return 0 == a.indexOf(b) };
epiviz.utils.stringEndsWith = function(a, b) { return a.lastIndexOf(b) == a.length - b.length };
epiviz.utils.fillArray = function(a, b) { a = a || 0; for (var c = Array(a), d = 0; d < a; ++d) c[d] = b; return c };
epiviz.utils.indexOf = function(a, b) { for (var c = 0; c < a.length; ++c)
        if (b(a[c])) return c;
    return -1 };
epiviz.utils.arraysEqual = function(a, b) { if (a == b) return !0; if (!a || !b || a.length != b.length || a < b || b < a) return !1; for (var c = 0; c < a.length; ++c)
        if (a[c] != b[c]) return !1;
    return !0 };
epiviz.utils.elementsEqual = function(a, b) { if (a == b) return !0; if (!a || !b || a.length != b.length) return !1; var c = {},
        d; for (d = 0; d < a.length; ++d) a[d] in c || (c[a[d]] = 0), ++c[a[d]]; for (d = 0; d < b.length; ++d) { if (!c[b[d]]) return !1;--c[b[d]] } return !0 };
epiviz.utils.range = function(a, b) { b = b || 0;
    a = a || 0; for (var c = Array(a), d = 0; d < a; ++d) c[d] = d + b; return c };
epiviz.utils.arrayAppend = function(a, b) { a.push.apply(a, b) };
epiviz.utils.arrayFlip = function(a) { for (var b = {}, c = 0; c < a.length; ++c) b[a[c]] = c; return b };
epiviz.utils.indexOfMin = function(a, b) { for (var c = null, d = null, e = 0; e < a.length; ++e)
        for (var f = b ? e + 1 : 0; f < a[e].length; ++f)
            if (null == d || a[e][f] < d) d = a[e][f], c = [e, f];
    return { min: d, index: c } };
epiviz.utils.arrayIntersection = function(a, b) { var c = {};
    a.forEach(function(a) { c[a] = a }); var d = [];
    b.forEach(function(a) { a in c && d.push(a) }); return d };
epiviz.utils.asyncFor = function(a, b, c) { if (a) { var d = function(e) { e >= a ? c && c() : b(e, function(a) { a ? c && c() : d(e + 1) }) };
        d(0) } else c && c() };
epiviz.utils.deferredFor = function(a, b) { for (var c = new epiviz.deferred.Deferred, d = new epiviz.deferred.Deferred, e = c.promise(), f = 0; f < a; ++f)(function(c) { e = e.then(function() { var e = b(c);
            c == a - 1 && e.then(function() { d.resolve() }); return e }) })(f);
    c.resolve(); return d };
epiviz.utils.mapCopy = function(a) { var b = {},
        c; for (c in a) a.hasOwnProperty(c) && (b[c] = a[c]); return b };
epiviz.utils.mapEquals = function(a, b) { if (a == b) return !0; if (!a || !b) return !1; for (var c in a)
        if (a.hasOwnProperty(c) && (!b.hasOwnProperty(c) || a[c] != b[c])) return !1;
    for (c in b)
        if (b.hasOwnProperty(c) && !a.hasOwnProperty(c)) return !1;
    return !0 };
epiviz.utils.mapCombine = function(a, b, c) { var d = {},
        e; if (b)
        for (e in b) b.hasOwnProperty(e) && (d[e] = b[e]); if (a)
        for (e in a) a.hasOwnProperty(e) && (c && d[e] && $.isArray(d[e]) && a[e] && $.isArray(a[e]) ? d[e] = d[e].concat(a[e]) : d[e] = a[e]); return d };
epiviz.utils.mapJoin = function(a, b, c) { b || "" === b || (b = ":");
    c || "" === c || (c = ","); var d = "",
        e; for (e in a) a.hasOwnProperty(e) && (d && (d += c), d += e + b + a[e]); return d };
epiviz.utils.mapKeyIntersection = function(a, b) { var c = []; if (!a || !b) return c; for (var d in a) a.hasOwnProperty(d) && d in b && c.push(d); return c };
epiviz.utils.forEach = function(a, b) { for (var c in a)
        if (a.hasOwnProperty(c) && b(a[c], c, a)) break };
epiviz.utils.evaluateFullyQualifiedTypeName = function(a) { try { for (var b = a.split("."), c = b.pop(), d = window, e = 0; e < b.length; ++e) d = d[b[e]]; var f = d[c]; return "function" !== typeof f ? (console.error("Unknown type name: " + a), null) : f } catch (g) { return console.error("Unknown type name: " + a), null } };
epiviz.utils.applyConstructor = function(a, b) { var c;
    c = function() {};
    c.prototype = a.prototype;
    c = new c;
    c.constructor = a;
    a.apply(c, b); return c };
epiviz.utils.RAD_TO_DEG = 180 / Math.PI;
epiviz.utils.DEG_TO_RAD = Math.PI / 180;
epiviz.utils.getInternetExplorerVersion = function() { var a = -1; if ("Microsoft Internet Explorer" == navigator.appName) { var b = /MSIE ([0-9]{1,}[.0-9]{0,})/.exec(navigator.userAgent);
        null != b && (a = parseFloat(b[1])) } return a };
epiviz.utils.generatePseudoGUID = function(a) { for (var b = "", c = 0; c < a; ++c) b += "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ" [Math.round(61 * Math.random())]; return b };
epiviz.utils.colorize = function(a, b, c, d, e, f) { return d3.scale.linear().domain([a, c, b]).range([d, f, e]) };
epiviz.utils.colorizeBinary = function(a, b, c, d) { return d3.scale.linear().domain([a, b]).range([c, d]) };
epiviz.utils.sign = function(a) { return 0 > a ? -1 : 0 == a ? 0 : 1 };
var caja = {};
epiviz.caja = {};
caja.initialize = function() {};
epiviz.caja.cajole = function(a, b) { var c = new epiviz.deferred.Deferred;
    setTimeout(function() { c.resolve(eval("(" + a + ")")) }, 0); return c };
epiviz.caja.run = function(a, b) { var c = new epiviz.deferred.Deferred;
    setTimeout(function() { var b = document.getElementsByTagName("head")[0],
            e = document.createElement("script");
        e.type = "text/javascript";
        e.src = a;
        e.onreadystatechange = e.onload = function() { c.resolve() };
        b.appendChild(e) }, 0); return c };
epiviz.caja.chain = function(a, b) { $.isArray(b) || (b = epiviz.utils.fillArray(a.length, b)); return epiviz.utils.deferredFor(a.length, function(c) { return epiviz.caja.run(a[c], b[c]) }) };
epiviz.caja.buildChartMethodContext = function() {
    return {
        epiviz: { ui: { charts: epiviz.ui.charts, controls: epiviz.ui.controls }, utils: epiviz.utils, plugins: epiviz.plugins, measurements: epiviz.measurements, events: epiviz.events, deferred: epiviz.deferred, datatypes: epiviz.datatypes, data: { DataProvider: epiviz.data.DataProvider, Request: epiviz.data.Request, Response: epiviz.data.Response, WebServerDataProvider: { makeGetRequest: epiviz.data.WebServerDataProvider.makeGetRequest } }, Config: epiviz.Config },
        d3: d3,
        $: $,
        sprintf: sprintf,
        goog: goog
    }
};
epiviz.events = {};
epiviz.events.EventListener = function(a) { this._id = epiviz.events.EventListener._nextId++;
    this._updateCallback = a };
epiviz.events.EventListener._nextId = 0;
epiviz.events.EventListener.prototype.update = function(a) { this._updateCallback(a) };
epiviz.events.EventListener.prototype.id = function() { return this._id };
epiviz.ui = {};
epiviz.ui.WebArgsManager = function(a, b) { this._locationManager = a;
    this._workspaceManager = b;
    this._registerLocationChanged();
    this._registerActiveWorkspaceChanged() };
epiviz.ui.WebArgsManager.WEB_ARGS = epiviz.ui.WebArgsManager.WEB_ARGS || {};
epiviz.ui.WebArgsManager.extractWindowLocationArgs = function() { var a = {};
    (0 < window.location.search.length ? window.location.search.substr(1) : "").split("&").forEach(function(b, c) { if (0 != b.trim().length) { var d = b.indexOf("[]"); if (0 != d) { var e, f;
                f = b.indexOf("=");
                0 > f ? (e = 0 > d ? b : b.substr(0, d), f = "true") : (e = 0 > d ? b.substr(0, f) : b.substr(0, d), f = b.substr(f + 1));
                e = decodeURIComponent(e);
                f = decodeURIComponent(f);
                0 > d ? a[e] = f : (e in a || (a[e] = []), a[e].push(f)) } } }); return a };
epiviz.ui.WebArgsManager.prototype._updateUrl = function() {
    var a = "?",
        b = epiviz.ui.WebArgsManager.WEB_ARGS;
    !("ws" in b) && "workspace" in b && (b.ws = b.workspace, delete b.workspace);
    for (var c in b)
        if (b.hasOwnProperty(c))
            if (Array.isArray(b[c]))
                for (var d, e = 0; e < b[c].length; ++e) d = b[c][e], void 0 == d && (d = "undefined"), a += sprintf("%s[]=%s&", c, d);
            else d = b[c], void 0 == d && (d = "undefined"), a += sprintf("%s=%s&", c, d);
    b = epiviz.utils.getInternetExplorerVersion();
    if (0 > b || 10 <= b) switch (window.location.protocol) {
        case "http:":
        case "https:":
            history.replaceState(null,
                "", a)
    }
};
epiviz.ui.WebArgsManager.prototype._registerLocationChanged = function() { var a = this;
    this._locationManager.onCurrentLocationChanged().addListener(new epiviz.events.EventListener(function(b) { epiviz.ui.WebArgsManager.WEB_ARGS.seqName = b.newValue.seqName();
        epiviz.ui.WebArgsManager.WEB_ARGS.start = b.newValue.start();
        epiviz.ui.WebArgsManager.WEB_ARGS.end = b.newValue.end();
        a._updateUrl() })) };
epiviz.ui.WebArgsManager.prototype._registerActiveWorkspaceChanged = function() { var a = this;
    this._workspaceManager.onActiveWorkspaceChanged().addListener(new epiviz.events.EventListener(function(b) { epiviz.ui.WebArgsManager.WEB_ARGS.ws = b.workspaceId || "";
        delete epiviz.ui.WebArgsManager.WEB_ARGS.workspace;
        a._updateUrl() })) };
epiviz.events.Event = function() { this._count = 0;
    this._listeners = {};
    this._firing = !1 };
epiviz.events.Event.prototype.addListener = function(a) { this._listeners[a.id()] || ++this._count;
    this._listeners[a.id()] = a };
epiviz.events.Event.prototype.removeListener = function(a) { this._listeners[a.id()] && (delete this._listeners[a.id()], --this._count) };
epiviz.events.Event.prototype.notify = function(a) { if (!this._firing && 0 != this._count) { this._firing = !0; for (var b in this._listeners) this._listeners.hasOwnProperty(b) && this._listeners[b].update(a);
        this._firing = !1 } };
epiviz.events.Event.prototype.isFiring = function() { return this._firing };
epiviz.data = {};
epiviz.data.MessageType = { REQUEST: "request", RESPONSE: "response" };
epiviz.data.Response = function(a, b) { this._id = a;
    this._data = b };
epiviz.data.Response.prototype.id = function() { return this._id };
epiviz.data.Response.prototype.data = function() { var a = this._data,
        b = Object.keys(a);
    0 < b.length && -1 != b.indexOf("success") && (b.splice(b.indexOf("success"), 1), delete a.success); return a };
epiviz.data.Response.prototype.type = function() { return epiviz.data.MessageType.RESPONSE };
epiviz.data.Response.prototype.raw = function() { return { requestId: this._id, type: this.type(), data: this._data } };
epiviz.data.Response.fromRawObject = function(a) { return new epiviz.data.Response(a.requestId, a.data) };
epiviz.data.DataProvider = function(a) {
    this._id = a;
    this._requestAddSeqInfos = new epiviz.events.Event;
    this._requestRemoveSeqNames = new epiviz.events.Event;
    this._requestAddMeasurements = new epiviz.events.Event;
    this._requestRemoveMeasurements = new epiviz.events.Event;
    this._requestAddChart = new epiviz.events.Event;
    this._requestRemoveChart = new epiviz.events.Event;
    this._requestFlushCache = new epiviz.events.Event;
    this._requestClearDatasourceGroupCache = new epiviz.events.Event;
    this._requestNavigate = new epiviz.events.Event;
    this._requestRe = new epiviz.events.Event;
    this._requestCurrentLocation = new epiviz.events.Event;
    this._requestPrintWorkspace = new epiviz.events.Event;
    this._requestSetChartSettings = new epiviz.events.Event;
    this._requestGetChartSettings = new epiviz.events.Event;
    this._requestGetAvailableCharts = new epiviz.events.Event;
    this._requestLoadWorkspace = new epiviz.events.Event
};
epiviz.data.DataProvider.prototype.id = function() { return this._id };
epiviz.data.DataProvider.prototype.getData = function(a, b) { b(epiviz.data.Response.fromRawObject({ requestId: a.id(), data: null })) };
epiviz.data.DataProvider.prototype.onRequestAddSeqInfos = function() { return this._requestAddSeqInfos };
epiviz.data.DataProvider.prototype.onRequestRemoveSeqNames = function() { return this._requestRemoveSeqNames };
epiviz.data.DataProvider.prototype.onRequestAddMeasurements = function() { return this._requestAddMeasurements };
epiviz.data.DataProvider.prototype.onRequestRemoveMeasurements = function() { return this._requestRemoveMeasurements };
epiviz.data.DataProvider.prototype.onRequestAddChart = function() { return this._requestAddChart };
epiviz.data.DataProvider.prototype.onRequestRemoveChart = function() { return this._requestRemoveChart };
epiviz.data.DataProvider.prototype.onRequestFlushCache = function() { return this._requestFlushCache };
epiviz.data.DataProvider.prototype.onRequestClearDatasourceGroupCache = function() { return this._requestClearDatasourceGroupCache };
epiviz.data.DataProvider.prototype.onRequestNavigate = function() { return this._requestNavigate };
epiviz.data.DataProvider.prototype.onRequestRe = function() { return this._requestRe };
epiviz.data.DataProvider.prototype.onRequestCurrentLocation = function() { return this._requestCurrentLocation };
epiviz.data.DataProvider.prototype.onRequestPrintWorkspace = function() { return this._requestPrintWorkspace };
epiviz.data.DataProvider.prototype.onRequestGetChartSettings = function() { return this._requestGetChartSettings };
epiviz.data.DataProvider.prototype.onRequestSetChartSettings = function() { return this._requestSetChartSettings };
epiviz.data.DataProvider.prototype.onRequestGetAvailableCharts = function() { return this._requestGetAvailableCharts };
epiviz.data.DataProvider.prototype.onRequestLoadWorkspace = function() { return this._requestLoadWorkspace };
epiviz.data.Request = function(a, b, c) { this._id = a;
    this._args = b;
    this._method = c };
epiviz.data.Request.Method = { GET: "get", POST: "post" };
epiviz.data.Request.Action = {
    GET_ROWS: "getRows",
    GET_VALUES: "getValues",
    GET_COMBINED: "getCombined",
    GET_MEASUREMENTS: "getMeasurements",
    SEARCH: "search",
    GET_SEQINFOS: "getSeqInfos",
    SAVE_WORKSPACE: "saveWorkspace",
    DELETE_WORKSPACE: "deleteWorkspace",
    GET_WORKSPACES: "getWorkspaces",
    GET_HIERARCHY: "getHierarchy",
    PROPAGATE_HIERARCHY_CHANGES: "propagateHierarchyChanges",
    GET_PCA: "getPCA",
    GET_DIVERSITY: "getDiversity",
    GET_CHART_SETTINGS: "getChartSettings",
    SET_CHART_SETTINGS: "setChartSettings",
    GET_AVAILABLE_CHARTS: "getAvailableCharts",
    ADD_MEASUREMENTS: "addMeasurements",
    REMOVE_MEASUREMENTS: "removeMeasurements",
    ADD_SEQINFOS: "addSeqInfos",
    REMOVE_SEQNAMES: "removeSeqNames",
    ADD_CHART: "addChart",
    REMOVE_CHART: "removeChart",
    CLEAR_DATASOURCE_GROUP_CACHE: "clearDatasourceGroupCache",
    FLUSH_CACHE: "flushCache",
    NAVIGATE: "navigate",
    RE: "re",
    GET_CURRENT_LOCATION: "getCurrentLocation",
    WRITE_DEBUG_MSG: "writeMsg",
    PRINT_WORKSPACE: "printWorkspace",
    LOAD_WORKSPACE: "loadWorkspace",
    REGISTER_CHART_TYPES: "registerChartTypes"
};
epiviz.data.Request.createRequest = function(a, b) { return new epiviz.data.Request(epiviz.data.Request._nextId++, a, b || epiviz.data.Request.Method.GET) };
epiviz.data.Request.fromRawObject = function(a) { return new epiviz.data.Request(a.requestId, a.data) };
epiviz.data.Request._nextId = 0;
epiviz.data.Request.prototype.id = function() { return this._id };
epiviz.data.Request.prototype.type = function() { return epiviz.data.MessageType.REQUEST };
epiviz.data.Request.prototype.method = function() { return this._method };
epiviz.data.Request.prototype.joinArgs = function(a, b) { a = a || "=";
    b = b || "&"; var c = sprintf("requestId%s%s", a, this._id),
        d; for (d in this._args)
        if (this._args.hasOwnProperty(d))
            if (Array.isArray(this._args[d]))
                for (var e = 0; e < this._args[d].length; ++e) c += sprintf("%s%s[]%s%s", b, d, a, this._args[d][e]);
            else c += sprintf("%s%s%s%s", b, d, a, this._args[d] || "");
    return c };
epiviz.data.Request.prototype.isEmpty = function() { for (var a in this._args)
        if (this._args.hasOwnProperty(a)) return !1;
    return !0 };
epiviz.data.Request.prototype.get = function(a) { return a in this._args ? this._args[a] : null };
epiviz.data.Request.prototype.raw = function() { return { requestId: this._id, type: this.type(), data: epiviz.utils.mapCopy(this._args) } };
epiviz.data.Request.emptyRequest = function() { return epiviz.data.Request.createRequest({}) };
epiviz.data.Request.getRows = function(a, b) { return epiviz.data.Request.createRequest({ version: epiviz.EpiViz.VERSION, action: epiviz.data.Request.Action.GET_ROWS, datasource: a.id(), seqName: b ? b.seqName() : void 0, start: b ? b.start() : void 0, end: b ? b.end() : void 0, metadata: a.metadata() }) };
epiviz.data.Request.getValues = function(a, b) { return epiviz.data.Request.createRequest({ version: epiviz.EpiViz.VERSION, action: epiviz.data.Request.Action.GET_VALUES, datasource: a.datasource().id(), measurement: a.id(), seqName: b ? b.seqName() : void 0, start: b ? b.start() : void 0, end: b ? b.end() : void 0 }) };
epiviz.data.Request.getCombined = function(a, b) { var c = {},
        d; for (d in a) a.hasOwnProperty(d) && (c[d] = function() { var b = [];
        a[d].foreach(function(a) { b.push(a.id()) }); return b }()); return epiviz.data.Request.createRequest({ version: epiviz.EpiViz.VERSION, action: epiviz.data.Request.Action.GET_COMBINED, seqName: b ? b.seqName() : void 0, start: b ? b.start() : void 0, end: b ? b.end() : void 0, measurements: c }) };
epiviz.data.Request.getMeasurements = function(a) { return epiviz.data.Request.createRequest({ version: epiviz.EpiViz.VERSION, action: epiviz.data.Request.Action.GET_MEASUREMENTS, datasourceGroup: a }) };
epiviz.data.Request.search = function(a, b) { return epiviz.data.Request.createRequest({ version: epiviz.EpiViz.VERSION, action: epiviz.data.Request.Action.SEARCH, q: a || "", maxResults: b }) };
epiviz.data.Request.getSeqInfos = function(a) { return epiviz.data.Request.createRequest({ version: epiviz.EpiViz.VERSION, action: epiviz.data.Request.Action.GET_SEQINFOS, datasourceGroup: a }) };
epiviz.data.Request.saveWorkspace = function(a, b) { return epiviz.data.Request.createRequest({ version: epiviz.EpiViz.VERSION, action: epiviz.data.Request.Action.SAVE_WORKSPACE, id: a.id(), name: a.name(), content: encodeURIComponent(JSON.stringify(a.raw(b).content)) }, epiviz.data.Request.Method.POST) };
epiviz.data.Request.deleteWorkspace = function(a) { return epiviz.data.Request.createRequest({ version: epiviz.EpiViz.VERSION, action: epiviz.data.Request.Action.DELETE_WORKSPACE, id: a.id() }, epiviz.data.Request.Method.POST) };
epiviz.data.Request.getWorkspaces = function(a, b) { return epiviz.data.Request.createRequest({ version: epiviz.EpiViz.VERSION, action: epiviz.data.Request.Action.GET_WORKSPACES, q: a || "", ws: b }) };
epiviz.data.Request.getHierarchy = function(a, b) { return epiviz.data.Request.createRequest({ version: epiviz.EpiViz.VERSION, action: epiviz.data.Request.Action.GET_HIERARCHY, datasourceGroup: a, nodeId: b }) };
epiviz.data.Request.propagateHierarchyChanges = function(a, b, c, d) { return epiviz.data.Request.createRequest({ version: epiviz.EpiViz.VERSION, action: epiviz.data.Request.Action.PROPAGATE_HIERARCHY_CHANGES, datasourceGroup: a, selection: b, order: c, selectedLevels: d }) };
epiviz.data.Request.getPCA = function(a, b) { var c = {},
        d; for (d in a) a.hasOwnProperty(d) && (c[d] = function() { var b = [];
        a[d].foreach(function(a) { b.push(a.id()) }); return b }()); return epiviz.data.Request.createRequest({ version: epiviz.EpiViz.VERSION, action: epiviz.data.Request.Action.GET_PCA, measurements: c }) };
epiviz.data.Request.getDiversity = function(a, b) { var c = {},
        d; for (d in a) a.hasOwnProperty(d) && (c[d] = function() { var b = [];
        a[d].foreach(function(a) { b.push(a.id()) }); return b }()); return epiviz.data.Request.createRequest({ version: epiviz.EpiViz.VERSION, action: epiviz.data.Request.Action.GET_DIVERSITY, measurements: c }) };
epiviz.measurements = {};
epiviz.measurements.Measurement = function(a, b, c, d, e, f, g, h, m, l, n, p) { var t = epiviz.measurements.Measurement.Type;
    this._id = a;
    this._name = b;
    this._type = c;
    this._datasource = c == t.RANGE ? this : new epiviz.measurements.Measurement(d, d, t.RANGE, d, e, f, null, "Blocks Track", null, null, null, p);
    this._datasourceGroup = e;
    this._dataprovider = f;
    this._formula = g || null;
    this._defaultChartType = h || null;
    this._annotation = m || null;
    this._minValue = l || 0 === l ? l : null;
    this._maxValue = n || 0 === n ? n : null;
    this._metadata = p || null };
epiviz.measurements.Measurement.Type = { FEATURE: "feature", RANGE: "range", UNORDERED: "unordered" };
epiviz.measurements.Measurement.Type.isOrdered = function(a) { return a == epiviz.measurements.Measurement.Type.FEATURE || a == epiviz.measurements.Measurement.Type.RANGE };
epiviz.measurements.Measurement.Type.hasValues = function(a) { return a == epiviz.measurements.Measurement.Type.FEATURE || a == epiviz.measurements.Measurement.Type.UNORDERED };
epiviz.measurements.Measurement.prototype.id = function() { return this._id };
epiviz.measurements.Measurement.prototype.name = function() { return this._name };
epiviz.measurements.Measurement.prototype.type = function() { return this._type };
epiviz.measurements.Measurement.prototype.datasource = function() { return this._datasource };
epiviz.measurements.Measurement.prototype.datasourceId = function() { return this._datasource.id() };
epiviz.measurements.Measurement.prototype.datasourceGroup = function() { return this._datasourceGroup };
epiviz.measurements.Measurement.prototype.dataprovider = function() { return this._dataprovider };
epiviz.measurements.Measurement.prototype.formula = function() { return this._formula };
epiviz.measurements.Measurement.prototype.formulaStr = function() { if (!this._formula) return ""; var a = this._formula.referredMeasurements,
        b = this._formula.expression.toString(),
        c; for (c in a) a.hasOwnProperty(c) && (b = b.replace(new RegExp("\\{" + c + "\\}", "g"), " {" + a[c].name() + "} ")); return b };
epiviz.measurements.Measurement.prototype.evaluate = function(a) { var b = {},
        c; for (c in this._formula.referredMeasurements)
        if (this._formula.referredMeasurements.hasOwnProperty(c)) { var d = this._formula.referredMeasurements[c];
            b["{" + c + "}"] = d.isComputed() ? d.evaluate(a) : a.get(d) }
    return this._formula.expression.evaluate(b) };
epiviz.measurements.Measurement.prototype.evaluateArr = function(a) { var b = {},
        c; for (c in this._formula.referredMeasurements)
        if (this._formula.referredMeasurements.hasOwnProperty(c)) { var d = this._formula.referredMeasurements[c];
            b["{" + c + "}"] = d.isComputed() ? d.evaluateArr(a) : a.get(d) }
    return this._formula.expression.evaluateArr(b) };
epiviz.measurements.Measurement.prototype.defaultChartType = function() { return this._defaultChartType };
epiviz.measurements.Measurement.prototype.annotation = function() { return this._annotation };
epiviz.measurements.Measurement.prototype.minValue = function() { return this._minValue };
epiviz.measurements.Measurement.prototype.maxValue = function() { return this._maxValue };
epiviz.measurements.Measurement.prototype.metadata = function() { return this._metadata || [] };
epiviz.measurements.Measurement.prototype.componentMeasurements = function() { var a = new epiviz.measurements.MeasurementSet; if (!this._formula) return a.add(this), a; for (var b in this._formula.referredMeasurements) this._formula.referredMeasurements.hasOwnProperty(b) && a.addAll(this._formula.referredMeasurements[b].componentMeasurements()); return a };
epiviz.measurements.Measurement.prototype.isComputed = function() { return this._formula ? !0 : !1 };
epiviz.measurements.Measurement.prototype.raw = function(a) {
    if (this._formula) { var b = this._formula.referredMeasurements,
            c = {},
            d; for (d in b) b.hasOwnProperty(d) && (c[d] = a.get(b[d])) }
    return {
        id: this._id,
        name: this._name,
        type: this._type,
        datasourceId: this._datasource._id,
        datasourceGroup: this._datasourceGroup,
        dataprovider: this._dataprovider,
        formula: this._formula ? { expression: this._formula.expression.toString(), referredMeasurements: c } : null,
        defaultChartType: this._defaultChartType,
        annotation: this._annotation,
        minValue: this._minValue,
        maxValue: this._maxValue,
        metadata: this._metadata
    }
};
epiviz.measurements.Measurement.prototype.toString = function() { return this.name() };
epiviz.measurements.Measurement.fromRawObject = function(a, b) {
    var c = null;
    if (a.formula) { for (var c = epiviz.utils.ExpressionParser.parse(a.formula.expression), d = {}, e = c.variables(), f = 0; f < e.length; ++f)
            if (epiviz.utils.stringStartsWith(e[f], "{") && epiviz.utils.stringEndsWith(e[f], "}")) { var g = parseInt(e[f].substring(1, e[f].length - 1));
                d[g] = b[a.formula.referredMeasurements[g]] }
        c = { expression: c, referredMeasurements: d } }
    return new epiviz.measurements.Measurement(a.id, a.name, a.type, a.datasourceId, a.datasourceGroup,
        a.dataprovider, c, a.defaultChartType, a.annotation, a.minValue, a.maxValue, a.metadata)
};
epiviz.utils.Iterable = function() {};
epiviz.utils.Iterable.prototype.foreach = function(a) {};
epiviz.utils.Iterator = function() {};
epiviz.utils.Iterator.prototype.first = function() { throw Error("unimplemented abstract method"); };
epiviz.utils.Iterator.prototype.next = function() { throw Error("unimplemented abstract method"); };
epiviz.measurements.MeasurementSet = function(a) { this._measurementTree = {};
    this._size = 0;
    this._order = [];
    a && this.addAll(a) };
epiviz.measurements.MeasurementSet.prototype.add = function(a) {
    a.dataprovider() in this._measurementTree || (this._measurementTree[a.dataprovider()] = {});
    a.type() in this._measurementTree[a.dataprovider()] || (this._measurementTree[a.dataprovider()][a.type()] = {});
    a.datasourceGroup() in this._measurementTree[a.dataprovider()][a.type()] || (this._measurementTree[a.dataprovider()][a.type()][a.datasourceGroup()] = {});
    a.datasource().id() in this._measurementTree[a.dataprovider()][a.type()][a.datasourceGroup()] || (this._measurementTree[a.dataprovider()][a.type()][a.datasourceGroup()][a.datasource().id()] = {});
    if (a.id() in this._measurementTree[a.dataprovider()][a.type()][a.datasourceGroup()][a.datasource().id()]) return !1;
    this._measurementTree[a.dataprovider()][a.type()][a.datasourceGroup()][a.datasource().id()][a.id()] = { measurement: a, index: this._order.length };
    this._order.push({ measurement: a, contained: !0 });
    ++this._size;
    return !0
};
epiviz.measurements.MeasurementSet.prototype.remove = function(a) {
    if (!(a.dataprovider() in this._measurementTree && a.type() in this._measurementTree[a.dataprovider()] && a.datasourceGroup() in this._measurementTree[a.dataprovider()][a.type()] && a.datasource().id() in this._measurementTree[a.dataprovider()][a.type()][a.datasourceGroup()] && a.id() in this._measurementTree[a.dataprovider()][a.type()][a.datasourceGroup()][a.datasource().id()])) return !1;
    this._order[this._measurementTree[a.dataprovider()][a.type()][a.datasourceGroup()][a.datasource().id()][a.id()].index].contained = !1;
    delete this._measurementTree[a.dataprovider()][a.type()][a.datasourceGroup()][a.datasource().id()][a.id()];
    --this._size;
    return !0
};
epiviz.measurements.MeasurementSet.prototype.addAll = function(a) { if (!a || !a.size()) return !1; var b = !1,
        c = this;
    a.foreach(function(a) { c.add(a) && (b = !0); return !1 }); return b };
epiviz.measurements.MeasurementSet.prototype.removeAll = function(a) { var b = !1,
        c = this;
    a.foreach(function(a) { c.remove(a) && (b = !0); return !1 }); return b };
epiviz.measurements.MeasurementSet.prototype.foreach = function(a, b) { for (var c = this.iterator(), d = c.first(), e = 0; null !== d && (b && !b(d) || !a(d, e)); d = c.next(), ++e); };
epiviz.measurements.MeasurementSet.prototype.iterator = function() { return new epiviz.measurements.MeasurementSet.Iterator(this) };
epiviz.measurements.MeasurementSet.prototype.subset = function(a) { var b = new epiviz.measurements.MeasurementSet;
    this.foreach(function(a) { b.add(a) }, a); return b };
epiviz.measurements.MeasurementSet.prototype.map = function(a) { var b = new epiviz.measurements.MeasurementSet;
    this.foreach(function(c) { b.add(a(c)) }); return b };
epiviz.measurements.MeasurementSet.prototype.size = function() { return this._size };
epiviz.measurements.MeasurementSet.prototype.contains = function(a) { return a.dataprovider() in this._measurementTree && a.type() in this._measurementTree[a.dataprovider()] && a.datasourceGroup() in this._measurementTree[a.dataprovider()][a.type()] && a.datasource().id() in this._measurementTree[a.dataprovider()][a.type()][a.datasourceGroup()] ? a.id() in this._measurementTree[a.dataprovider()][a.type()][a.datasourceGroup()][a.datasource().id()] : !1 };
epiviz.measurements.MeasurementSet.prototype.first = function() { return this.iterator().first() };
epiviz.measurements.MeasurementSet.prototype.get = function(a) { if (a >= this._size || 0 > a) return null; if (this._size == this._order.length) return this._order[a].measurement; var b = null;
    this.foreach(function(c, d) { return d == a ? (b = c, !0) : !1 }); return b };
epiviz.measurements.MeasurementSet.prototype.toArray = function() { var a = Array(this._size);
    this.foreach(function(b, c) { a[c] = b }); return a };
epiviz.measurements.MeasurementSet.prototype.sorted = function(a) { a = this.toArray().sort(a); var b = new epiviz.measurements.MeasurementSet;
    a.forEach(function(a) { b.add(a) }); return b };
epiviz.measurements.MeasurementSet.prototype.raw = function() { var a = Array(this._size);
    this.foreach(function(b, c) { a[c] = b.raw() }); return a };
epiviz.measurements.MeasurementSet.prototype.split = function(a) { var b = {};
    this.foreach(function(c, d) { var e = a(c),
            f = b[e];
        void 0 == f && (f = new epiviz.measurements.MeasurementSet, b[e] = f);
        f.add(c) }); return b };
epiviz.measurements.MeasurementSet.Iterator = function(a) { this._parent = a;
    this._lastIndex = null };
epiviz.measurements.MeasurementSet.Iterator.prototype.first = function() { if (0 == this._parent.size()) return null; for (var a = 0; a < this._parent._order.length; ++a)
        if (this._parent._order[a].contained) return this._lastIndex = a, this._parent._order[a].measurement;
    throw Error("Inconsistent MeasurementSet with size() > 0 and no first element"); };
epiviz.measurements.MeasurementSet.Iterator.prototype.next = function() { if (null === this._lastIndex) throw Error("Iterator.next() called before calling Iterator.first()"); for (var a = this._lastIndex + 1; a < this._parent._order.length; ++a)
        if (this._parent._order[a].contained) return this._lastIndex = a, this._parent._order[a].measurement;
    this._lastIndex = this._parent._order.length; return null };
epiviz.ui.controls = {};
epiviz.ui.controls.VisConfigSelection = function(a, b, c, d, e, f, g, h) { this.measurements = a;
    this.datasource = b;
    this.datasourceGroup = c;
    this.dataprovider = d;
    this.annotation = e;
    this.defaultChartType = f;
    this.minSelectedMeasurements = g || 1;
    this.customData = h };
epiviz.events.EventResult = function() { this.value = this.errorMessage = this.success = null };
epiviz.datatypes = {};
epiviz.datatypes.GenomicRange = function(a, b, c) { void 0 != c && 0 > c && (c = -c, void 0 != b && (b -= c));
    this._seqname = a;
    this._start = b;
    this._width = c };
epiviz.datatypes.GenomicRange.fromStartEnd = function(a, b, c) { return new epiviz.datatypes.GenomicRange(a, b, void 0 != b && void 0 != c ? c - b : void 0) };
epiviz.datatypes.GenomicRange.prototype.seqName = function() { return this._seqname };
epiviz.datatypes.GenomicRange.prototype.start = function() { return this._start };
epiviz.datatypes.GenomicRange.prototype.width = function() { return this._width };
epiviz.datatypes.GenomicRange.prototype.end = function() { return void 0 != this._start && void 0 != this._width ? this._start + this._width : void 0 };
epiviz.datatypes.GenomicRange.prototype.isEmpty = function() { return 0 >= this._width };
epiviz.datatypes.GenomicRange.prototype.subtract = function(a) {
    return !a || a.seqName() != this._seqname || a.isEmpty() || a.start() >= this.end() || this._start >= a.end() ? [this] : a.start() <= this._start && a.end() >= this.end() ? [] : a.start() > this._start && a.end() < this.end() ? [epiviz.datatypes.GenomicRange.fromStartEnd(this._seqname, this._start, a.start()), epiviz.datatypes.GenomicRange.fromStartEnd(this._seqname, a.end(), this.end())] : a.start() > this._start ? [epiviz.datatypes.GenomicRange.fromStartEnd(this._seqname, this._start,
        a.start())] : [epiviz.datatypes.GenomicRange.fromStartEnd(this._seqname, a.end(), this.end())]
};
epiviz.datatypes.GenomicRange.prototype.equals = function(a) { return a ? a == this ? !0 : this._seqname == a._seqname && this._start == a._start && this._width == a._width : !1 };
epiviz.datatypes.GenomicRange.prototype.overlapsWith = function(a) { return a ? this == a ? !0 : this.seqName() != a.seqName() ? !1 : this.start() < a.end() && this.end() > a.start() : !1 };
epiviz.datatypes.GenomicRange.prototype.raw = function() { return { seqName: this._seqname, start: this._start, width: this._width } };
epiviz.datatypes.GenomicRange.fromRawObject = function(a) { return new epiviz.datatypes.GenomicRange(a.seqName, a.start, a.width) };
epiviz.ui.charts = {};
epiviz.ui.charts.ColorPalette = function(a, b, c, d) { this._colors = a;
    this._id = c || epiviz.utils.generatePseudoGUID(6);
    this._name = b || "Custom (" + this._id + ")";
    this._keyIndices = d || {};
    this._nKeys = 0 };
epiviz.ui.charts.ColorPalette.prototype.id = function() { return this._id };
epiviz.ui.charts.ColorPalette.prototype.name = function() { return this._name };
epiviz.ui.charts.ColorPalette.prototype.get = function(a) { return this._colors[a % this._colors.length] };
epiviz.ui.charts.ColorPalette.prototype.getByKey = function(a) { var b = this._keyIndices[a];
    void 0 == b && (b = this._nKeys, this._keyIndices[a] = this._nKeys, ++this._nKeys); return this.get(b) };
epiviz.ui.charts.ColorPalette.prototype.keyColorIndex = function(a) { a = this._keyIndices[a]; return void 0 == a ? -1 : a };
epiviz.ui.charts.ColorPalette.prototype.keyIndices = function() { return this._keyIndices };
epiviz.ui.charts.ColorPalette.prototype.size = function() { return this._colors.length };
epiviz.ui.charts.ColorPalette.prototype.equals = function(a) { return this == a ? !0 : a ? epiviz.utils.arraysEqual(this._colors, a._colors) : !1 };
epiviz.ui.charts.ColorPalette.prototype.copy = function() { return new epiviz.ui.charts.ColorPalette(this._colors.slice(0)) };
epiviz.ui.charts.ColorPalette.prototype.raw = function(a) { return a && this._id in a.colorPalettesMap ? { id: this._id } : { id: this._id, name: this._name, colors: this._colors } };
epiviz.ui.charts.ColorPalette.fromRawObject = function(a, b) { if ($.isArray(a)) return new epiviz.ui.charts.ColorPalette(a); if (b && a.id in b.colorPalettesMap) return b.colorPalettesMap[a.id];
    a.colors && a.colors.length || (a.colors = epiviz.Config.COLORS_BRIGHT); return new epiviz.ui.charts.ColorPalette(a.colors, a.name, a.id) };
epiviz.data.WebsocketDataProvider = function(a, b) { epiviz.data.DataProvider.call(this, a || epiviz.data.WebsocketDataProvider.DEFAULT_ID);
    this._websocketHost = b;
    this._socket = null;
    this._useUI = "true" != epiviz.ui.WebArgsManager.WEB_ARGS.websocketNoUI;
    this._debug = "true" == epiviz.ui.WebArgsManager.WEB_ARGS.debug;
    this._callbacks = {};
    this._requestsStack = [];
    this._initialize() };
epiviz.data.WebsocketDataProvider.prototype = epiviz.utils.mapCopy(epiviz.data.DataProvider.prototype);
epiviz.data.WebsocketDataProvider.constructor = epiviz.data.WebsocketDataProvider;
epiviz.data.WebsocketDataProvider.DEFAULT_ID = "websocket";
epiviz.data.WebsocketDataProvider.prototype._initialize = function() { if (this._websocketHost && "None" != this._websocketHost) try { this._socket = new WebSocket(this._websocketHost);
        this._log("WebSocket - status " + this._socket.readyState); var a = this;
        this._socket.onopen = function() { a._onSocketOpen() };
        this._socket.onmessage = function(b) { a._onSocketMessage(b) };
        this._socket.onclose = function() { a._onSocketClose() } } catch (b) { this._log(b.toString()) } };
epiviz.data.WebsocketDataProvider.prototype._onSocketOpen = function() { for (var a = 0; a < this._requestsStack.length; ++a) this._socket.send(this._requestsStack[a]);
    this._requestsStack = [];
    this._registerAvailableCharts() };
epiviz.data.WebsocketDataProvider.prototype._onSocketClose = function() { this._socket = null };
epiviz.data.WebsocketDataProvider.prototype._sendMessage = function(a) { this.connected() && this._socket.readyState ? this._socket.send(a) : this._requestsStack.push(a) };
epiviz.data.WebsocketDataProvider.prototype._onSocketMessage = function(a) {
    this._log("Local Controller Received: " + a.data);
    var b = JSON.parse(a.data);
    b.data.dataprovidertype = "websocket";
    if (b.type == epiviz.data.MessageType.RESPONSE) a = epiviz.data.Response.fromRawObject(b), b = this._callbacks[a.id()], delete this._callbacks[a.id()], b(a);
    else if (b.type == epiviz.data.MessageType.REQUEST) switch (a = epiviz.data.Request.Action, b = epiviz.data.Request.fromRawObject(b), b.get("action")) {
        case a.ADD_MEASUREMENTS:
            this._addMeasurements(b);
            break;
        case a.REMOVE_MEASUREMENTS:
            this._removeMeasurements(b);
            break;
        case a.ADD_SEQINFOS:
            this._addSeqInfos(b);
            break;
        case a.REMOVE_SEQNAMES:
            this._removeSeqNames(b);
            break;
        case a.ADD_CHART:
            this._addChart(b);
            break;
        case a.REMOVE_CHART:
            this._removeChart(b);
            break;
        case a.CLEAR_DATASOURCE_GROUP_CACHE:
            this._clearDatasourceGroupCache(b);
            break;
        case a.FLUSH_CACHE:
            this._flushCache(b);
            break;
        case a.NAVIGATE:
            this._navigate(b);
            break;
        case a.RE:
            this._re(b);
            break;
        case a.GET_CURRENT_LOCATION:
            this._getCurrentLocation(b);
            break;
        case a.WRITE_DEBUG_MSG:
            this._writeDebugMsg(b);
            break;
        case a.PRINT_WORKSPACE:
            this._printWorkspace(b);
            break;
        case a.SET_CHART_SETTINGS:
            this._setChartSettings(b);
            break;
        case a.GET_CHART_SETTINGS:
            this._getChartSettings(b);
            break;
        case a.GET_AVAILABLE_CHARTS:
            this._getAvailableCharts(b);
            break;
        case a.LOAD_WORKSPACE:
            this._loadWorkspace(b)
    }
};
epiviz.data.WebsocketDataProvider.prototype._log = function(a) { this._debug && console.log(a) };
epiviz.data.WebsocketDataProvider.prototype._fireEvent = function(a, b) { this._useUI ? a.notify(b) : b.result.success = !0 };
epiviz.data.WebsocketDataProvider.prototype.connected = function() { return null != this._socket };
epiviz.data.WebsocketDataProvider.prototype.getData = function(a, b) { var c = JSON.stringify(a.raw());
    this._callbacks[a.id()] = b;
    this._sendMessage(c) };
epiviz.data.WebsocketDataProvider.prototype._addMeasurements = function(a) {
    for (var b = new epiviz.events.EventResult, c = new epiviz.measurements.MeasurementSet, d = JSON.parse(a.get("measurements")), e = 0; e < d.length; ++e) c.add(new epiviz.measurements.Measurement(d[e].id, d[e].name, d[e].type, d[e].datasourceId, d[e].datasourceGroup, this.id(), null, d[e].defaultChartType, d[e].annotation, d[e].minValue, d[e].maxValue, d[e].metadata));
    this._fireEvent(this.onRequestAddMeasurements(), { measurements: c, result: b });
    a = new epiviz.data.Response(a.id(),
        b);
    this._sendMessage(JSON.stringify(a.raw()))
};
epiviz.data.WebsocketDataProvider.prototype._removeMeasurements = function(a) {
    for (var b = new epiviz.events.EventResult, c = new epiviz.measurements.MeasurementSet, d = JSON.parse(a.get("measurements")), e = 0; e < d.length; ++e) c.add(new epiviz.measurements.Measurement(d[e].id, d[e].name, d[e].type, d[e].datasourceId, d[e].datasourceGroup, this.id(), null, d[e].defaultChartType, d[e].annotation, d[e].minValue, d[e].maxValue, d[e].metadata));
    this._fireEvent(this.onRequestRemoveMeasurements(), { measurements: c, result: b });
    a = new epiviz.data.Response(a.id(),
        b);
    this._sendMessage(JSON.stringify(a.raw()))
};
epiviz.data.WebsocketDataProvider.prototype._addSeqInfos = function(a) { var b = new epiviz.events.EventResult,
        c = JSON.parse(a.get("seqInfos"));
    this._fireEvent(this.onRequestAddSeqInfos(), { seqInfos: c, result: b });
    a = new epiviz.data.Response(a.id(), b);
    this._sendMessage(JSON.stringify(a.raw())) };
epiviz.data.WebsocketDataProvider.prototype._removeSeqNames = function(a) { var b = new epiviz.events.EventResult,
        c = JSON.parse(a.get("seqNames"));
    this._fireEvent(this.onRequestRemoveSeqNames(), { seqNames: c, result: b });
    a = new epiviz.data.Response(a.id(), b);
    this._sendMessage(JSON.stringify(a.raw())) };
epiviz.data.WebsocketDataProvider.prototype._addChart = function(a) {
    var b = new epiviz.events.EventResult,
        c, d, e;
    if (void 0 != a.get("measurements"))
        for (c = new epiviz.measurements.MeasurementSet, d = JSON.parse(a.get("measurements")), e = 0; e < d.length; ++e) c.add(new epiviz.measurements.Measurement(d[e].id, d[e].name, d[e].type, d[e].datasourceId, d[e].datasourceGroup, this.id(), null, d[e].defaultChartType, d[e].annotation, d[e].minValue, d[e].maxValue, d[e].metadata));
    d = a.get("datasource");
    e = a.get("datasourceGroup") || d;
    this._fireEvent(this.onRequestAddChart(), { type: a.get("type"), visConfigSelection: new epiviz.ui.controls.VisConfigSelection(c, d, e), result: b });
    a = new epiviz.data.Response(a.id(), b);
    this._sendMessage(JSON.stringify(a.raw()))
};
epiviz.data.WebsocketDataProvider.prototype._removeChart = function(a) { var b = a.get("chartId"),
        c = new epiviz.events.EventResult;
    this._fireEvent(this.onRequestRemoveChart(), { id: b, result: c });
    a = new epiviz.data.Response(a.id(), c);
    this._sendMessage(JSON.stringify(a.raw())) };
epiviz.data.WebsocketDataProvider.prototype._clearDatasourceGroupCache = function(a) { var b = new epiviz.events.EventResult;
    this._fireEvent(this.onRequestClearDatasourceGroupCache(), { datasourceGroup: a.get("datasourceGroup"), result: b });
    a = new epiviz.data.Response(a.id(), b);
    this._sendMessage(JSON.stringify(a.raw())) };
epiviz.data.WebsocketDataProvider.prototype._flushCache = function(a) { var b = new epiviz.events.EventResult;
    this._fireEvent(this.onRequestFlushCache(), { result: b });
    a = new epiviz.data.Response(a.id(), b);
    this._sendMessage(JSON.stringify(a.raw())) };
epiviz.data.WebsocketDataProvider.prototype._navigate = function(a) { var b = JSON.parse(a.get("range")),
        c = new epiviz.events.EventResult;
    this._fireEvent(this.onRequestNavigate(), { range: epiviz.datatypes.GenomicRange.fromStartEnd(b.seqName, b.start, b.end), result: c });
    a = new epiviz.data.Response(a.id(), c);
    this._sendMessage(JSON.stringify(a.raw())) };
epiviz.data.WebsocketDataProvider.prototype._re = function(a) { var b = new epiviz.events.EventResult;
    this._fireEvent(this.onRequestRe(), { result: b });
    a = new epiviz.data.Response(a.id(), b);
    this._sendMessage(JSON.stringify(a.raw())) };
epiviz.data.WebsocketDataProvider.prototype._getCurrentLocation = function(a) { var b = new epiviz.events.EventResult;
    this._fireEvent(this.onRequestCurrentLocation(), { result: b });
    a = new epiviz.data.Response(a.id(), b);
    this._sendMessage(JSON.stringify(a.raw())) };
epiviz.data.WebsocketDataProvider.prototype._writeDebugMsg = function(a) { var b = a.get("msg"),
        c = document.createElement("pre");
    c.innerHTML = b.replace(/&/g, "&amp;").replace(/\\</g, "&lt;");
    a = new epiviz.data.Response(a.id(), { msg: "that msg" });
    document.getElementById("chart-container").appendChild(c);
    this._sendMessage(JSON.stringify(a.raw())) };
epiviz.data.WebsocketDataProvider.prototype._printWorkspace = function(a) { var b = a.get("chartId"),
        c = a.get("fileName"),
        d = a.get("fileType"),
        e = new epiviz.events.EventResult;
    this._fireEvent(this.onRequestPrintWorkspace(), { chartId: b, fileName: c, fileType: d, result: e });
    a = new epiviz.data.Response(a.id(), e);
    this._sendMessage(JSON.stringify(a.raw())) };
epiviz.data.WebsocketDataProvider.prototype._setChartSettings = function(a) { var b = a.get("chartId"),
        c = a.get("settings"),
        d = a.get("colorMap"),
        d = new epiviz.ui.charts.ColorPalette(d),
        e = new epiviz.events.EventResult;
    this._fireEvent(this.onRequestSetChartSettings(), { chartId: b, settings: c, colorMap: d, result: e });
    a = new epiviz.data.Response(a.id(), e);
    this._sendMessage(JSON.stringify(a.raw())) };
epiviz.data.WebsocketDataProvider.prototype._getChartSettings = function(a) { var b = a.get("chartId"),
        c = new epiviz.events.EventResult;
    this._fireEvent(this.onRequestGetChartSettings(), { chartId: b, result: c });
    a = new epiviz.data.Response(a.id(), c);
    this._sendMessage(JSON.stringify(a.raw())) };
epiviz.data.WebsocketDataProvider.prototype._getAvailableCharts = function(a) { var b = new epiviz.events.EventResult;
    this._fireEvent(this.onRequestGetChartSettings(), { result: b });
    a = new epiviz.data.Response(a.id(), b);
    this._sendMessage(JSON.stringify(a.raw())) };
epiviz.data.WebsocketDataProvider.prototype._registerAvailableCharts = function() { var a = new epiviz.events.EventResult;
    this._fireEvent(this.onRequestGetChartSettings(), { result: a });
    request = epiviz.data.Request.createRequest({ action: epiviz.data.Request.Action.REGISTER_CHART_TYPES, data: a.value });
    a = JSON.stringify(request.raw());
    this._callbacks[request.id()] = function(a) {};
    this._sendMessage(a) };
epiviz.data.WebsocketDataProvider.prototype.updateChartSettings = function(a, b) { var c = JSON.stringify(a.raw());
    this._callbacks[a.id()] = b;
    this._sendMessage(c) };
epiviz.data.WebsocketDataProvider.prototype._loadWorkspace = function(a) { var b = a.get("workspaceId"),
        c = new epiviz.events.EventResult;
    this._fireEvent(this.onRequestLoadWorkspace(), { workspace: b });
    a = new epiviz.data.Response(a.id(), c);
    this._sendMessage(JSON.stringify(a.raw())) };
epiviz.data.WebServerDataProvider = function(a, b) { epiviz.data.DataProvider.call(this, a || epiviz.Config.DEFAULT_DATA_PROVIDER_ID);
    this._serverEndpoint = b || epiviz.data.WebServerDataProvider.DEFAULT_SERVER_ENDPOINT };
epiviz.data.WebServerDataProvider.prototype = epiviz.utils.mapCopy(epiviz.data.DataProvider.prototype);
epiviz.data.WebServerDataProvider.constructor = epiviz.data.WebServerDataProvider;
epiviz.data.WebServerDataProvider.DEFAULT_SERVER_ENDPOINT = "data/main.php";
epiviz.data.WebServerDataProvider.prototype.getData = function(a, b) { if (!a.isEmpty())
        if (a.method() == epiviz.data.Request.Method.GET) { var c = sprintf("%s?%s", this._serverEndpoint, a.joinArgs());
            epiviz.data.WebServerDataProvider.makeGetRequest(c, function(a) { b(epiviz.data.Response.fromRawObject(a)) }) } else epiviz.data.WebServerDataProvider.makePostRequest(this._serverEndpoint, a.joinArgs(), function(a) { b(epiviz.data.Response.fromRawObject(a)) }) };
epiviz.data.WebServerDataProvider.makeGetRequest = function(a, b) { var c = $.ajax({ type: "get", url: a, dataType: "json", async: !0, cache: !1, processData: !0 });
    c.done(function(a) { b(a) });
    c.fail(function(a, b, c) {});
    c.always(function() {}) };
epiviz.data.WebServerDataProvider.makePostRequest = function(a, b, c) { a = $.ajax({ type: "post", url: a, data: b, dataType: "json", async: !0, cache: !1, processData: !0 });
    a.done(function(a, b, f) { c(a) });
    a.fail(function(a, b, c) { console.error("The following error occured: " + b, c) });
    a.always(function() {}) };
epiviz.Config = function(a) {
    this.workspacesDataProvider = this.dataProviders = this.defaultWorkspaceSettings = this.navigationDelay = this.navigationStepRatio = this.zoomoutRatio = this.zoominRatio = this.chartSaverLocation = this.dataServerLocation = null;
    this.useCache = !0;
    this.useCookie = null;
    this.cacheUpdateIntervalMilliseconds = 3E4;
    this.colorPalettesMap = this.colorPalettes = this.clustering = this.chartCustomSettings = this.chartSettings = this.chartTypes = this.maxSearchResults = null;
    if (a) {
        for (var b in a) a.hasOwnProperty(b) &&
            (this[b] = a[b]);
        if ("epivizr_standalone" != a.configType && (b = epiviz.ui.WebArgsManager.WEB_ARGS["websocket-host"]) && b.length)
            for (var c = 0; c < b.length; ++c) this.dataProviders.push(sprintf("epiviz.data.WebsocketDataProvider,%s,%s", epiviz.data.WebsocketDataProvider.DEFAULT_ID + "-" + c, b[c]))
    }
    var d = {};
    this.colorPalettes.forEach(function(a) { d[a.id()] = a });
    this.colorPalettesMap = d;
    "default" != a.configType && (this.useCookie = epiviz.ui.WebArgsManager.WEB_ARGS.useCookie)
};
epiviz.Config.SETTINGS = {};
epiviz.Config.DEFAULT_DATA_PROVIDER_ID = "umd";
epiviz.Config.DEFAULT_WORKSPACE_NAME = "Default Workspace";
epiviz.Config.EPIVIZ_V1_COLORS = "#025167 #e7003e #ffcd00 #057d9f #970026 #ffe373 #ff8100".split(" ");
epiviz.Config.COLORS_BRIGHT = "#1859a9 #ed2d2e #008c47 #010101 #f37d22 #662c91 #a11d20 #b33893".split(" ");
epiviz.Config.COLORS_LIGHT = "#b8d2eb #f2aeac #d8e4aa #cccccc #f2d1b0 #d4b2d3 #ddb8a9 #ebbfd9".split(" ");
epiviz.Config.COLORS_MEDIUM = "#599ad3 #f1595f #79c36a #727272 #f9a65a #9e66ab #cd7058 #d77fb3".split(" ");
epiviz.Config.COLORS_D3_CAT10 = "#1f77b4 #ff7f0e #2ca02c #d62728 #9467bd #8c564b #e377c2 #7f7f7f #bcbd22 #17becf".split(" ");
epiviz.Config.COLORS_D3_CAT20 = "#1f77b4 #aec7e8 #ff7f0e #ffbb78 #2ca02c #98df8a #d62728 #ff9896 #9467bd #c5b0d5 #8c564b #c49c94 #e377c2 #f7b6d2 #7f7f7f #c7c7c7 #bcbd22 #dbdb8d #17becf #9edae5".split(" ");
epiviz.Config.COLORS_D3_CAT20B = "#393b79 #5254a3 #6b6ecf #9c9ede #637939 #8ca252 #b5cf6b #cedb9c #8c6d31 #bd9e39 #e7ba52 #e7cb94 #843c39 #ad494a #d6616b #e7969c #7b4173 #a55194 #ce6dbd #de9ed6".split(" ");
epiviz.Config.COLORS_D3_CAT20C = "#3182bd #6baed6 #9ecae1 #c6dbef #e6550d #fd8d3c #fdae6b #fdd0a2 #31a354 #74c476 #a1d99b #c7e9c0 #756bb1 #9e9ac8 #bcbddc #dadaeb #636363 #969696 #bdbdbd #d9d9d9".split(" ");
epiviz.Config.VisualizationPropertySettings = { WIDTH: "width", HEIGHT: "height", MARGINS: "margins", COLORS: "colors", DECORATIONS: "decorations" };
epiviz.data.RequestStack = function() { this._requests = [];
    this._callbacks = {};
    this._dataMap = {} };
epiviz.data.RequestStack.prototype.pushRequest = function(a, b) { this._requests.push(a);
    this._callbacks[a.id()] = b };
epiviz.data.RequestStack.prototype.serveData = function(a) {
    if (this._callbacks[a.id()])
        if (0 < this._requests.length && this._requests[0].id() == a.id()) {
            var b = this._callbacks[a.id()];
            delete this._callbacks[a.id()];
            this._requests = this._requests.slice(1);
            for (b(a.data()); 0 < this._requests.length && this._requests[0].id() in this._dataMap;) b = this._callbacks[this._requests[0].id()], a = this._dataMap[this._requests[0].id()], delete this._callbacks[this._requests[0].id()], delete this._dataMap[this._requests[0].id()], this._requests =
                this._requests.slice(1), b(a)
        } else this._dataMap[a.id()] = a.data()
};
epiviz.data.RequestStack.prototype.clear = function() { this._requests = [];
    this._callbacks = {};
    this._dataMap = {} };
epiviz.measurements.MeasurementHashtable = function() { this._size = 0;
    this._measurementTree = {};
    this._order = [] };
epiviz.measurements.MeasurementHashtable.prototype.put = function(a, b) {
    if (this.contains(a)) { var c = this._measurementTree[a.dataprovider()][a.type()][a.datasourceGroup()][a.datasource().id()][a.id()];
        this._measurementTree[a.dataprovider()][a.type()][a.datasourceGroup()][a.datasource().id()][a.id()] = { key: a, value: b, index: c.index };
        this._order[c.index] = { key: a, value: b, contained: !0 } } else a.dataprovider() in this._measurementTree || (this._measurementTree[a.dataprovider()] = {}), a.type() in this._measurementTree[a.dataprovider()] ||
        (this._measurementTree[a.dataprovider()][a.type()] = {}), a.datasourceGroup() in this._measurementTree[a.dataprovider()][a.type()] || (this._measurementTree[a.dataprovider()][a.type()][a.datasourceGroup()] = {}), a.datasource().id() in this._measurementTree[a.dataprovider()][a.type()][a.datasourceGroup()] || (this._measurementTree[a.dataprovider()][a.type()][a.datasourceGroup()][a.datasource().id()] = {}), this._measurementTree[a.dataprovider()][a.type()][a.datasourceGroup()][a.datasource().id()][a.id()] = {
            key: a,
            value: b,
            index: this._order.length
        }, this._order.push({ key: a, value: b, contained: !0 }), ++this._size
};
epiviz.measurements.MeasurementHashtable.prototype.get = function(a) { return this.contains(a) ? this._measurementTree[a.dataprovider()][a.type()][a.datasourceGroup()][a.datasource().id()][a.id()].value : null };
epiviz.measurements.MeasurementHashtable.prototype.remove = function(a) { if (!this.contains(a)) return !1; var b = this._measurementTree[a.dataprovider()][a.type()][a.datasourceGroup()][a.datasource().id()][a.id()];
    delete this._measurementTree[a.dataprovider()][a.type()][a.datasourceGroup()][a.datasource().id()][a.id()];
    this._order[b.index].contained = !1;--this._size; return !0 };
epiviz.measurements.MeasurementHashtable.prototype.contains = function(a) { return a.dataprovider() in this._measurementTree && a.type() in this._measurementTree[a.dataprovider()] && a.datasourceGroup() in this._measurementTree[a.dataprovider()][a.type()] && a.datasource().id() in this._measurementTree[a.dataprovider()][a.type()][a.datasourceGroup()] ? a.id() in this._measurementTree[a.dataprovider()][a.type()][a.datasourceGroup()][a.datasource().id()] : !1 };
epiviz.measurements.MeasurementHashtable.prototype.clear = function() { this._size = 0;
    this._measurementTree = {};
    this._order = [] };
epiviz.measurements.MeasurementHashtable.prototype.isEmpty = function() { return 0 == this._size };
epiviz.measurements.MeasurementHashtable.prototype.size = function() { return this._size };
epiviz.measurements.MeasurementHashtable.prototype.foreach = function(a, b) { for (var c = this.iterator(), d = c.first(), e = 0; null !== d && (b && !b(d.key) || !a(d.key, d.value, e)); d = c.next(), ++e); };
epiviz.measurements.MeasurementHashtable.prototype.first = function() { return this.iterator().first() };
epiviz.measurements.MeasurementHashtable.prototype.sorted = function(a) { var b = new epiviz.measurements.MeasurementHashtable,
        c = this._order.slice(0);
    c.sort(function(b, c) { return a(b.key, c.key) });
    c.forEach(function(a) { a.contained && b.put(a.key, a.value) }); return b };
epiviz.measurements.MeasurementHashtable.prototype.keys = function() { var a = [];
    this._order.forEach(function(b) { b.contained && a.push(b.key) }); return a };
epiviz.measurements.MeasurementHashtable.prototype.iterator = function() { return new epiviz.measurements.MeasurementHashtable.Iterator(this) };
epiviz.measurements.MeasurementHashtable.prototype.toString = function() { var a = {};
    this.foreach(function(b, c) { for (var d = b.id(), e = 2; d in a;) d = b.id() + " (" + e++ + ")";
        a[d] = c }); return JSON.stringify(a) };
epiviz.measurements.MeasurementHashtable.Iterator = function(a) { this._parent = a;
    this._lastIndex = null };
epiviz.measurements.MeasurementHashtable.Iterator.prototype.first = function() { if (0 == this._parent.size()) return null; for (var a = 0; a < this._parent._order.length; ++a)
        if (this._parent._order[a].contained) return this._lastIndex = a, { key: this._parent._order[a].key, value: this._parent._order[a].value };
    throw Error("Inconsistent MeasurementHashtable with size() > 0 and no first element"); };
epiviz.measurements.MeasurementHashtable.Iterator.prototype.next = function() { if (null === this._lastIndex) throw Error("Iterator.next() called before calling Iterator.first()"); for (var a = this._lastIndex + 1; a < this._parent._order.length; ++a)
        if (this._parent._order[a].contained) return this._lastIndex = a, { key: this._parent._order[a].key, value: this._parent._order[a].value };
    this._lastIndex = this._parent._order.length; return null };
epiviz.datatypes.MeasurementGenomicData = function() {};
epiviz.datatypes.MeasurementGenomicData.prototype.get = function(a) { throw Error("unimplemented abstract method"); };
epiviz.datatypes.MeasurementGenomicData.prototype.getRow = function(a) { throw Error("unimplemented abstract method"); };
epiviz.datatypes.MeasurementGenomicData.prototype.measurement = function() { throw Error("unimplemented abstract method"); };
epiviz.datatypes.MeasurementGenomicData.prototype.globalStartIndex = function() { throw Error("unimplemented abstract method"); };
epiviz.datatypes.MeasurementGenomicData.prototype.globalEndIndex = function() { throw Error("unimplemented abstract method"); };
epiviz.datatypes.MeasurementGenomicData.prototype.size = function() { throw Error("unimplemented abstract method"); };
epiviz.datatypes.MeasurementGenomicData.prototype.getByGlobalIndex = function(a) { throw Error("unimplemented abstract method"); };
epiviz.datatypes.MeasurementGenomicData.prototype.getRowByGlobalIndex = function(a) { throw Error("unimplemented abstract method"); };
epiviz.datatypes.MeasurementGenomicData.prototype.binarySearchStarts = function(a) { throw Error("unimplemented abstract method"); };
epiviz.datatypes.MeasurementGenomicDataArrayWrapper = function(a, b, c) { this._measurement = a;
    this._items = b;
    this._itemsByGlobalIndex = c };
epiviz.datatypes.MeasurementGenomicDataArrayWrapper.prototype.get = function(a) { return this._items && 0 <= a && a < this._items.length ? this._items[a] : null };
epiviz.datatypes.MeasurementGenomicDataArrayWrapper.prototype.getRow = function(a) { return this._items && 0 <= a && a < this._items.length ? this._items[a].rowItem : null };
epiviz.datatypes.MeasurementGenomicDataArrayWrapper.prototype.measurement = function() { return this._measurement };
epiviz.datatypes.MeasurementGenomicDataArrayWrapper.prototype.globalStartIndex = function() { return this._items && this._items.length ? this._items[0].globalIndex : null };
epiviz.datatypes.MeasurementGenomicDataArrayWrapper.prototype.globalEndIndex = function() { return this._items && this._items.length ? this._items[this._items.length - 1].globalIndex + 1 : null };
epiviz.datatypes.MeasurementGenomicDataArrayWrapper.prototype.size = function() { return this._items ? this._items.length : 0 };
epiviz.datatypes.MeasurementGenomicDataArrayWrapper.prototype.getByGlobalIndex = function(a) { return this._itemsByGlobalIndex && a in this._itemsByGlobalIndex ? this._itemsByGlobalIndex[a] : null };
epiviz.datatypes.MeasurementGenomicDataArrayWrapper.prototype.getRowByGlobalIndex = function(a) { return this._itemsByGlobalIndex && a in this._itemsByGlobalIndex ? this._itemsByGlobalIndex[a].rowItem : null };
epiviz.datatypes.MeasurementGenomicDataArrayWrapper.prototype.binarySearchStarts = function(a) {
    if (!this._items || !this._items.length || this._items[0].rowItem.start() > a.end() || this._items[this._items.length - 1].rowItem.start() < a.start()) return { index: null, length: 0 };
    for (var b = 0, c = this._items.length - 1, d, e = null; b <= c;) d = Math.floor(.5 * (b + c)), this._items[d].rowItem.start() == a.start() ? (e = d, c = d - 1) : this._items[d].rowItem.start() < a.start() ? b = d + 1 : c = d - 1;
    null === e && (e = b);
    for (var b = 0, c = this._items.length - 1, f = null; b <= c;) d =
        Math.floor(.5 * (b + c)), this._items[d].rowItem.start() == a.end() ? (f = d, b = d + 1) : this._items[d].rowItem.start() < a.end() ? b = d + 1 : c = d - 1;
    null === f && (f = b - 1);
    return { index: e, length: f + 1 - e }
};
epiviz.datatypes.GenomicData = function() {};
epiviz.datatypes.GenomicData.prototype.ready = function(a) { throw Error("unimplemented abstract method"); };
epiviz.datatypes.GenomicData.prototype.isReady = function() { throw Error("unimplemented abstract method"); };
epiviz.datatypes.GenomicData.prototype.firstSeries = function() { throw Error("unimplemented abstract method"); };
epiviz.datatypes.GenomicData.prototype.getSeries = function(a) { throw Error("unimplemented abstract method"); };
epiviz.datatypes.GenomicData.prototype.get = function(a, b) { throw Error("unimplemented abstract method"); };
epiviz.datatypes.GenomicData.prototype.getRow = function(a, b) { throw Error("unimplemented abstract method"); };
epiviz.datatypes.GenomicData.prototype.measurements = function() { throw Error("unimplemented abstract method"); };
epiviz.datatypes.GenomicData.prototype.globalStartIndex = function(a) { throw Error("unimplemented abstract method"); };
epiviz.datatypes.GenomicData.prototype.globalEndIndex = function(a) { throw Error("unimplemented abstract method"); };
epiviz.datatypes.GenomicData.prototype.size = function(a) { throw Error("unimplemented abstract method"); };
epiviz.datatypes.GenomicData.prototype.getByGlobalIndex = function(a, b) { throw Error("unimplemented abstract method"); };
epiviz.datatypes.GenomicData.prototype.getRowByGlobalIndex = function(a, b) { throw Error("unimplemented abstract method"); };
epiviz.datatypes.GenomicData.prototype.binarySearchStarts = function(a, b) { throw Error("unimplemented abstract method"); };
epiviz.datatypes.GenomicData.prototype.foreach = function(a) { throw Error("unimplemented abstract method"); };
epiviz.datatypes.GenomicData.ValueItem = function(a, b, c, d, e) { this.globalIndex = a;
    this.rowItem = b;
    this.value = 0 === c || c ? c : null;
    this.measurement = d;
    this.valueAnnotation = e };
epiviz.datatypes.GenomicData.RowItem = function() {};
epiviz.datatypes.GenomicData.RowItem.prototype.id = function() { throw Error("unimplemented abstract method"); };
epiviz.datatypes.GenomicData.RowItem.prototype.seqName = function() { throw Error("unimplemented abstract method"); };
epiviz.datatypes.GenomicData.RowItem.prototype.start = function() { throw Error("unimplemented abstract method"); };
epiviz.datatypes.GenomicData.RowItem.prototype.end = function() { throw Error("unimplemented abstract method"); };
epiviz.datatypes.GenomicData.RowItem.prototype.globalIndex = function() { throw Error("unimplemented abstract method"); };
epiviz.datatypes.GenomicData.RowItem.prototype.strand = function() { throw Error("unimplemented abstract method"); };
epiviz.datatypes.GenomicData.RowItem.prototype.metadata = function(a) { throw Error("unimplemented abstract method"); };
epiviz.datatypes.GenomicData.RowItem.prototype.rowMetadata = function() { throw Error("unimplemented abstract method"); };
epiviz.datatypes.MapGenomicData = function(a) { this._measurements = (this._map = a) ? a.keys() : null;
    this._mapLoaded = new epiviz.deferred.Deferred;
    this._map && this._mapLoaded.resolve() };
epiviz.datatypes.MapGenomicData.prototype.ready = function(a) { this._mapLoaded.done(a) };
epiviz.datatypes.MapGenomicData.prototype.isReady = function() { return this._mapLoaded.state() == epiviz.deferred.Deferred.State.RESOLVED };
epiviz.datatypes.MapGenomicData.prototype._setMap = function(a) { if (this._map) throw Error("MapGenomicData is immutable"); if (this._map = a) this._measurements = a.keys(), this._mapLoaded.resolve() };
epiviz.datatypes.MapGenomicData.prototype.firstSeries = function() { return 0 == this._map.size() ? null : this._map.first().value };
epiviz.datatypes.MapGenomicData.prototype.getSeries = function(a) { return this._map.get(a) };
epiviz.datatypes.MapGenomicData.prototype.get = function(a, b) { var c = this._map.get(a); return c ? c.get(b) : null };
epiviz.datatypes.MapGenomicData.prototype.getRow = function(a, b) { var c = this._map.get(a); return c ? c.getRow(b) : null };
epiviz.datatypes.MapGenomicData.prototype.measurements = function() { return this._measurements };
epiviz.datatypes.MapGenomicData.prototype.globalStartIndex = function(a) { return (a = this._map.get(a)) ? a.globalStartIndex() : null };
epiviz.datatypes.MapGenomicData.prototype.globalEndIndex = function(a) { return (a = this._map.get(a)) ? a.globalEndIndex() : null };
epiviz.datatypes.MapGenomicData.prototype.size = function(a) { return (a = this._map.get(a)) ? a.size() : null };
epiviz.datatypes.MapGenomicData.prototype.getByGlobalIndex = function(a, b) { var c = this._map.get(a); return c ? c.getByGlobalIndex(b) : null };
epiviz.datatypes.MapGenomicData.prototype.getRowByGlobalIndex = function(a, b) { var c = this._map.get(a); return c ? c.getRowByGlobalIndex(b) : null };
epiviz.datatypes.MapGenomicData.prototype.binarySearchStarts = function(a, b) { var c = this._map.get(a); return c ? c.binarySearchStarts(b) : { index: null, length: 0 } };
epiviz.datatypes.MapGenomicData.prototype.foreach = function(a) { this._map.foreach(function(b, c, d) { a(b, c, d) }) };
epiviz.datatypes.PartialSummarizedExperiment = function() { this._rowData = null;
    this._values = new epiviz.measurements.MeasurementHashtable };
epiviz.datatypes.PartialSummarizedExperiment.prototype.ranges = function() { return this.rowData() };
epiviz.datatypes.PartialSummarizedExperiment.prototype.rowData = function() { return this._rowData };
epiviz.datatypes.PartialSummarizedExperiment.prototype.addRowData = function(a) { a && (!this._rowData || this._rowData.boundaries().seqName() != a.boundaries().seqName() || this._rowData.boundaries().start() > a.boundaries().end() || this._rowData.boundaries().end() < a.boundaries().start() || a.measurement().type() == epiviz.measurements.Measurement.Type.UNORDERED ? this._rowData = a : this._rowData = this._rowData.merge(a)) };
epiviz.datatypes.PartialSummarizedExperiment.prototype.addValues = function(a) { if (a) { var b = this._values.get(a.measurement());!b || b.boundaries().seqName() != a.boundaries().seqName() || b.boundaries().start() > a.boundaries().end() || b.boundaries().end() < a.boundaries().start() || a.measurement().type() == epiviz.measurements.Measurement.Type.UNORDERED ? this._values.put(a.measurement(), a) : this._values.put(a.measurement(), b.merge(a)) } };
epiviz.datatypes.PartialSummarizedExperiment.prototype.trim = function(a) { var b = new epiviz.datatypes.PartialSummarizedExperiment;
    this._rowData && b.addRowData(this._rowData.trim(a));
    b.rowData() && this._values.foreach(function(c, d) { b.addValues(d.trim(a, b.rowData().globalStartIndex(), b.rowData().size())) }); return b };
epiviz.datatypes.PartialSummarizedExperiment.prototype.values = function(a) { return this._values.get(a) };
epiviz.datatypes.PartialSummarizedExperiment.prototype.calcMinGlobalIndex = function() { var a = this._rowData ? this._rowData.globalStartIndex() : null;
    this._values && this._values.foreach(function(b, c) { c && void 0 != c.globalStartIndex() && (void 0 == a || a > c.globalStartIndex()) && (a = c.globalStartIndex()) }); return a };
epiviz.datatypes.PartialSummarizedExperiment.prototype.calcMaxGlobalIndex = function() { var a = this._rowData && void 0 != this._rowData.globalStartIndex() ? this._rowData.globalStartIndex() + this._rowData.size() : null;
    this._values && this._values.foreach(function(b, c) { c && void 0 != c.globalStartIndex() && (void 0 == a || a < c.globalStartIndex() + c.size()) && (a = c.globalStartIndex() + c.size()) }); return a };
epiviz.datatypes.PartialSummarizedExperiment.prototype.toString = function() {
    var a = "",
        b = this.calcMinGlobalIndex(),
        c = this.calcMaxGlobalIndex(),
        a = a + sprintf("%25s", this._rowData && this._rowData.measurement() ? this._rowData.measurement().name().substr(0, 22) : "[undefined datasource]"),
        d, e, f, g, h;
    this._rowData && this._rowData.boundaries() ? (d = this._rowData.boundaries().seqName(), e = this._rowData.boundaries().start(), f = this._rowData.boundaries().end(), g = void 0 != this._rowData.globalStartIndex() ? this._rowData.globalStartIndex() :
        "*", h = this._rowData.size()) : (d = e = f = g = "*", h = 0);
    var a = a + sprintf(" [%6s%10s%10s] [globalStartIndex: %10s] [size: %7s]\n", d, e, f, g, h),
        m = sprintf("%15s%15s%15s%15s%15s", "id", "idx", "chr", "start", "end");
    this._values && this._values.foreach(function(b, c) {
        a += sprintf("%25s", b.name().substr(0, 22));
        c && c.boundaries() ? (d = c.boundaries().seqName(), e = c.boundaries().start(), f = c.boundaries().end()) : d = e = f = "*";
        a += sprintf(" [%6s%10s%10s] [globalStartIndex: %10s] [size: %7s]\n", d, e, f, void 0 != c.globalStartIndex() ? c.globalStartIndex() :
            "*", c.size());
        m += sprintf("%25s", b.name().substr(0, 22))
    });
    for (var a = a + (m + "\n"), l = b; l < c; ++l) this._rowData && void 0 != this._rowData.globalStartIndex() && this._rowData.globalStartIndex() <= l && this._rowData.globalStartIndex() + this._rowData.size() > l ? (g = this._rowData.getByGlobalIndex(l), b = g.id(), d = g.seqName(), e = g.start(), f = g.end()) : b = d = e = f = "*", a += sprintf("%15s%15s%15s%15s%15s", b, l, d, e, f), this._values && this._values.foreach(function(b, c) {
        a = c && void 0 != c.globalStartIndex() && c.globalStartIndex() <= l && c.globalStartIndex() +
            c.size() > l ? a + sprintf("%25s", c.getByGlobalIndex(l)) : a + sprintf("%25s", "*")
    }), a += "\n";
    return a
};
epiviz.data.Cache = function(a, b) { this._config = a;
    this._dataProviderFactory = b;
    this._data = {};
    this._measurementRequestStackMap = new epiviz.measurements.MeasurementHashtable;
    this._measurementPendingRequestsMap = new epiviz.measurements.MeasurementHashtable;
    this._lastRequest = null; if (0 < this._config.cacheUpdateIntervalMilliseconds) { var c = this;
        this._intervalId = window.setTimeout(function() { c._clearUnneededData() }, a.cacheUpdateIntervalMilliseconds) } };
epiviz.data.Cache.prototype.getData = function(a, b, c) {
    var d = epiviz.measurements.Measurement.Type,
        e = this;
    this._lastRequest = epiviz.datatypes.GenomicRange.fromStartEnd(a.seqName(), a.start() - a.width(), a.end() + a.width());
    0 < this._config.cacheUpdateIntervalMilliseconds && (window.clearInterval(this._intervalId), this._intervalId = window.setTimeout(function() { e._clearUnneededData() }, this._config.cacheUpdateIntervalMilliseconds));
    var f = this._extractComputedMeasurements(b);
    this._updateComputedMeasurementsData(f);
    this._serveAvailableData(a, b, c);
    f = [a, epiviz.datatypes.GenomicRange.fromStartEnd(a.seqName(), Math.max(a.start() - a.width(), 0), a.start()), new epiviz.datatypes.GenomicRange(a.seqName(), a.end(), a.width())];
    this._calcMeasurementNeededRanges(f, b).foreach(function(f, h) {
        var g = e._measurementRequestStackMap.get(f);
        g || (g = new epiviz.data.RequestStack, e._measurementRequestStackMap.put(f, g));
        var l;
        if (0 == h.length) l = epiviz.data.Request.emptyRequest(), g.pushRequest(l, function() { e._handleResponse(c, a, b, l, null, f, null) }),
            g.serveData(new epiviz.data.Response(l.id(), {}));
        else
            for (var n = 0; n < h.length; ++n) {
                l = f.type() == d.RANGE ? epiviz.data.Request.getRows(f, h[n]) : epiviz.data.Request.getValues(f, h[n]);
                (function(d, h) { g.pushRequest(h, function(g) { e._handleResponse(c, a, b, h, d, f, g) }) })(h[n], l);
                var p = e._measurementPendingRequestsMap.get(f);
                p || (p = {}, e._measurementPendingRequestsMap.put(f, p));
                p[l.id()] = h[n];
                (e._dataProviderFactory.get(f.dataprovider()) || e._dataProviderFactory.get(epiviz.data.EmptyResponseDataProvider.DEFAULT_ID)).getData(l,
                    function(a) { g.serveData(a) })
            }
    })
};
epiviz.data.Cache.prototype._handleResponse = function(a, b, c, d, e, f, g) { e && (e = f.type() == epiviz.measurements.Measurement.Type.RANGE ? new epiviz.datatypes.GenomicRangeArray(f, e, g.globalStartIndex, g.values, g.useOffset) : new epiviz.datatypes.FeatureValueArray(f, e, g.globalStartIndex, g.values), this._mergeData(f, e));
    e = this._extractComputedMeasurements(c);
    this._updateComputedMeasurementsData(e);
    (f = this._measurementPendingRequestsMap.get(f)) && delete f[d.id()];
    this._serveAvailableData(b, c, a) };
epiviz.data.Cache.prototype._serveAvailableData = function(a, b, c) {
    var d = epiviz.measurements.Measurement.Type,
        e = this,
        f = [],
        g;
    for (g in b)
        if (b.hasOwnProperty(g)) {
            var h = b[g],
                m = !0,
                l = new epiviz.measurements.MeasurementHashtable;
            (function(b) {
                h.foreach(function(c) {
                    var f = e._data[c.datasourceGroup()];
                    if (!f || !f.rowData() || c.type() == d.FEATURE && !f.values(c)) return m = !1, !0;
                    var g = f.rowData(),
                        f = c.type() == d.FEATURE ? f.values(c) : null,
                        g = a.subtract(g.boundaries());
                    if (g.length || f && (g = a.subtract(f.boundaries()), g.length)) return m = !1, !0;
                    b.put(c, new epiviz.datatypes.MeasurementGenomicDataWrapper(c, e._data[c.datasourceGroup()]));
                    return !1
                })
            })(l);
            m && (c(g, new epiviz.datatypes.MapGenomicData(l)), f.push(g))
        }
    for (c = 0; c < f.length; ++c) delete b[f[c]]
};
epiviz.data.Cache.prototype._calcMeasurementNeededRanges = function(a, b) {
    var c = epiviz.measurements.Measurement.Type,
        d = this,
        e = new epiviz.measurements.MeasurementHashtable,
        f;
    for (f in b)
        if (b.hasOwnProperty(f)) {
            var g = new epiviz.measurements.MeasurementSet;
            (function(a) { b[f].foreach(function(b) { b.componentMeasurements().foreach(function(b) { a.add(b);
                        a.add(b.datasource()) });
                    b.isComputed() || a.add(b.datasource()) }) })(g);
            g.foreach(function(b) {
                var f;
                f = d._data[b.datasourceGroup()];
                if (!f || b.type() == c.FEATURE && !f.values(b)) f =
                    a.slice(0);
                else { var g = b.type() == c.FEATURE ? f.values(b) : f.rowData(); if (g) { f = []; for (var g = g.boundaries(), h = 0; h < a.length; ++h) f = f.concat(a[h].subtract(g)) } else f = a.slice(0) }
                if (g = d._measurementPendingRequestsMap.get(b))
                    for (h = 0; h < f.length; ++h)
                        for (var p in g)
                            if (g.hasOwnProperty(p)) { var t = f[h].subtract(g[p]);
                                Array.prototype.splice.apply(f, [h, 1].concat(t)); if (0 == t.length) {--h; break } if (h >= f.length) break }
                e.put(b, f)
            })
        }
    return e
};
epiviz.data.Cache.prototype._extractComputedMeasurements = function(a) { var b = new epiviz.measurements.MeasurementSet,
        c; for (c in a) a.hasOwnProperty(c) && a[c].foreach(function(a) { a.isComputed() && b.add(a) }); return b };
epiviz.data.Cache.prototype._mergeData = function(a, b) { var c = epiviz.measurements.Measurement.Type,
        d = this._data[a.datasourceGroup()];
    d || (d = new epiviz.datatypes.PartialSummarizedExperiment, this._data[a.datasourceGroup()] = d);
    a.type() == c.RANGE ? d.addRowData(b) : d.addValues(b) };
epiviz.data.Cache.prototype._clearUnneededData = function() { if (this._lastRequest) { console.log(sprintf("Clearing data outside of range [%7s%10s%10s]", this._lastRequest.seqName(), this._lastRequest.start(), this._lastRequest.end())); var a = {},
            b; for (b in this._data) this._data.hasOwnProperty(b) && (a[b] = this._data[b].trim(this._lastRequest));
        this._data = a } };
epiviz.data.Cache.prototype._updateComputedMeasurementsData = function(a) {
    var b = this,
        c = epiviz.datatypes.GenomicRange;
    a.foreach(function(a) {
        var d = b._data[a.datasourceGroup()];
        if (!d) return !1;
        var f = a.componentMeasurements(),
            g = null,
            h = null,
            m = null;
        f.foreach(function(a) {
            a = d.values(a);
            if (!a || !a.boundaries()) return m = h = g = null, !0;
            if (null === m) return g = a.globalStartIndex(), h = a.size(), m = a.boundaries(), null === g;
            if (a.boundaries().seqName() != m.seqName()) return h = 0, !0;
            if (g < a.globalStartIndex()) {
                h -= a.globalStartIndex() -
                    g;
                if (0 > h) return h = 0, !0;
                g = a.globalStartIndex();
                var b = a.boundaries().start(),
                    e = m.end();
                h > a.size() && (h = a.size(), e = a.boundaries().end());
                m = c.fromStartEnd(m.seqName(), b, e)
            } else if (b = a.size() - g + a.globalStartIndex(), h > b) { h = b; if (0 >= h) return h = 0, !0;
                m = c.fromStartEnd(m.seqName(), m.start(), a.boundaries().end()) }
            return 0 == h ? !0 : !1
        });
        if (null === m) return !1;
        var l = d.values(a);
        if (l && (null === g || l.globalStartIndex() < g && l.globalStartIndex() + l.size() > g + h)) return !1;
        var n = new epiviz.measurements.MeasurementHashtable,
            p = null;
        if (l && l.size()) return f.foreach(function(a) { var b = d.values(a),
                    c = []; if (null !== g)
                    for (var e = g; e < l.globalStartIndex(); ++e) c.push(b.getByGlobalIndex(e));
                n.put(a, c) }), p = new epiviz.datatypes.FeatureValueArray(a, c.fromStartEnd(m.seqName(), m.start(), l.boundaries().start()), g, a.evaluateArr(n)), b._mergeData(a, p), n = new epiviz.measurements.MeasurementHashtable, f.foreach(function(a) { var b = d.values(a),
                    c = []; if (null !== g)
                    for (var e = l.globalStartIndex() + l.size(); e < g + h; ++e) c.push(b.getByGlobalIndex(e));
                n.put(a, c) }), p =
            new epiviz.datatypes.FeatureValueArray(a, c.fromStartEnd(m.seqName(), l.boundaries().end(), m.end()), l.globalStartIndex() + l.size(), a.evaluateArr(n)), b._mergeData(a, p), !1;
        n = new epiviz.measurements.MeasurementHashtable;
        f.foreach(function(a) { var b = d.values(a),
                c = []; if (null !== g)
                for (var e = g; e < g + h; ++e) c.push(b.getByGlobalIndex(e));
            n.put(a, c) });
        p = new epiviz.datatypes.FeatureValueArray(a, m, g, a.evaluateArr(n));
        b._mergeData(a, p);
        return !1
    })
};
epiviz.data.Cache.prototype.flush = function() { this._data = {};
    this._measurementRequestStackMap.foreach(function(a, b) { b.clear() });
    this._measurementPendingRequestsMap.clear() };
epiviz.data.Cache.prototype.clearDatasourceGroupCache = function(a) { delete this._data[a];
    this._measurementRequestStackMap.foreach(function(b, c) { b.datasourceGroup() == a && c.clear() }); var b = [];
    this._measurementPendingRequestsMap.foreach(function(c, e) { c.datasourceGroup() == a && b.push(c) }); for (var c = 0; c < b.length; ++c) this._measurementPendingRequestsMap.put(b[c], {}) };
epiviz.data.EmptyResponseDataProvider = function() { epiviz.data.DataProvider.call(this, epiviz.data.EmptyResponseDataProvider.DEFAULT_ID) };
epiviz.data.EmptyResponseDataProvider.prototype = epiviz.utils.mapCopy(epiviz.data.DataProvider.prototype);
epiviz.data.EmptyResponseDataProvider.constructor = epiviz.data.EmptyResponseDataProvider;
epiviz.data.EmptyResponseDataProvider.DEFAULT_ID = "empty";
epiviz.data.EmptyResponseDataProvider.prototype.getData = function(a, b) {
    var c = a.id();
    switch (a.get("action")) {
        case epiviz.data.Request.Action.GET_ROWS:
            b(epiviz.data.Response.fromRawObject({ data: { values: { id: null, start: [], end: [], strand: [], metadata: { my_metadata: [] } }, globalStartIndex: null, useOffset: !1 }, requestId: c }));
            break;
        case epiviz.data.Request.Action.GET_VALUES:
            b(epiviz.data.Response.fromRawObject({ data: { values: [], globalStartIndex: null }, requestId: c }));
            break;
        case epiviz.data.Request.Action.GET_MEASUREMENTS:
            b(epiviz.data.Response.fromRawObject({
                requestId: a.id(),
                data: { id: [], name: [], type: [], datasourceId: [], datasourceGroup: [], defaultChartType: [], annotation: [], minValue: [], maxValue: [], metadata: [] }
            }));
            break;
        case epiviz.data.Request.Action.GET_SEQINFOS:
            b(epiviz.data.Response.fromRawObject({ requestId: a.id(), data: [] }));
            break;
        case epiviz.data.Request.Action.SEARCH:
            b(epiviz.data.Response.fromRawObject({ requestId: a.id(), data: [] }));
            break;
        case epiviz.data.Request.Action.SAVE_WORKSPACE:
            b(epiviz.data.Response.fromRawObject({ requestId: a.id(), data: [] }));
            break;
        case epiviz.data.Request.Action.DELETE_WORKSPACE:
            b(epiviz.data.Response.fromRawObject({
                requestId: a.id(),
                data: []
            }));
            break;
        case epiviz.data.Request.Action.GET_WORKSPACES:
            b(epiviz.data.Response.fromRawObject({ requestId: a.id(), data: [] }));
            break;
        default:
            epiviz.data.DataProvider.prototype.getData.call(this, a, b)
    }
};
epiviz.data.DataProviderFactory = function(a) {
    this._config = a;
    this._providers = {};
    for (var b = this._size = 0; b < this._config.dataProviders.length; ++b) { a = $.isArray(this._config.dataProviders[b]) ? this._config.dataProviders[b] : this._config.dataProviders[b].split(","); var c = epiviz.utils.evaluateFullyQualifiedTypeName(a[0]);
        c && (a = epiviz.utils.applyConstructor(c, a.slice(1)), this._providers[a.id()] = a, ++this._size) }
    a = new epiviz.data.EmptyResponseDataProvider;
    this._providers[a.id()] = a;
    ++this._size;
    a = this._config.workspacesDataProvider.split(",");
    b = epiviz.utils.evaluateFullyQualifiedTypeName(a[0]);
    this._workspacesDataProvider = epiviz.utils.applyConstructor(b, a.slice(1))
};
epiviz.data.DataProviderFactory.prototype.foreach = function(a) { for (var b in this._providers)
        if (this._providers.hasOwnProperty(b) && a(this._providers[b])) break };
epiviz.data.DataProviderFactory.prototype.isEmpty = function() { return !this._size };
epiviz.data.DataProviderFactory.prototype.size = function() { return this._size };
epiviz.data.DataProviderFactory.prototype.get = function(a) { return a in this._providers ? this._providers[a] : null };
epiviz.data.DataProviderFactory.prototype.workspacesDataProvider = function() { return this._workspacesDataProvider };
epiviz.datatypes.GenomicArray = function(a, b, c, d) { this._measurement = a;
    this._boundaries = b;
    this._globalStartIndex = c;
    this._values = d };
epiviz.datatypes.GenomicArray.prototype.boundaries = function() { return this._boundaries };
epiviz.datatypes.GenomicArray.prototype.globalStartIndex = function() { return this._globalStartIndex };
epiviz.datatypes.GenomicArray.prototype.measurement = function() { return this._measurement };
epiviz.datatypes.GenomicArray.prototype.get = function(a) { throw Error("unimplemented abstract method"); };
epiviz.datatypes.GenomicArray.prototype.size = function() { throw Error("unimplemented abstract method"); };
epiviz.datatypes.GenomicArray.prototype.getByGlobalIndex = function(a) { return this.get(a - this._globalStartIndex) };
epiviz.datatypes.GenomicArray.prototype.concatValues = function(a, b) { throw Error("unimplemented abstract method"); };
epiviz.datatypes.GenomicArray.prototype.createNew = function(a, b, c, d) { throw Error("unimplemented abstract method"); };
epiviz.datatypes.GenomicArray.prototype.merge = function(a) {
    if (!a || void 0 == a.boundaries()) return this;
    if (this.boundaries().seqName() != a.boundaries().seqName() || this.boundaries().start() > a.boundaries().end() || a.boundaries().start() > this.boundaries().end()) throw Error("Two genomic arrays can only be merged if they overlap or are in continuation to one another");
    var b = this.boundaries().start() < a.boundaries().start() ? this : a,
        c = b == this ? a : this;
    if (b.boundaries().end() >= c.boundaries().end()) return b;
    var d = void 0 !=
        b.globalStartIndex() && void 0 != c.globalStartIndex() ? b.globalStartIndex() + b.size() - c.globalStartIndex() : 0;
    a = b.measurement();
    var e = void 0 != b.globalStartIndex() ? b.globalStartIndex() : c.globalStartIndex(),
        f = epiviz.datatypes.GenomicRange.fromStartEnd(b.boundaries().seqName(), b.boundaries().start(), c.boundaries().end()),
        b = b.concatValues(c, d);
    return this.createNew(a, f, e, b)
};
epiviz.datatypes.GenomicRangeArray = function(a, b, c, d, e) { epiviz.datatypes.GenomicArray.call(this, a, b, c, d);
    this._id = d.id;
    this._start = d.start;
    this._end = d.end;
    this._strand = d.strand || null;
    this._metadata = d.metadata;
    this._size = null; if (e)
        for (a = 1; a < this._start.length; ++a) this._start[a] += this._start[a - 1], this._end && (this._end[a] += this._end[a - 1]) };
epiviz.datatypes.GenomicRangeArray.prototype = epiviz.utils.mapCopy(epiviz.datatypes.GenomicArray.prototype);
epiviz.datatypes.GenomicRangeArray.constructor = epiviz.datatypes.GenomicRangeArray;
epiviz.datatypes.GenomicRangeArray.prototype.createNew = function(a, b, c, d) { return new epiviz.datatypes.GenomicRangeArray(a, b, c, d) };
epiviz.datatypes.GenomicRangeArray.prototype.get = function(a) { return 0 > a || a >= this.size() ? null : new epiviz.datatypes.GenomicRangeArray.RowItemWrapper(this, a) };
epiviz.datatypes.GenomicRangeArray.prototype.size = function() { void 0 == this._size && (this._size = Math.max(this._id ? this._id.length : 0, this._start ? this._start.length : 0, this._end ? this._end.length : 0, this._metadata && Object.keys(this._metadata).length ? Math.max.apply(void 0, $.map(this._metadata, function(a) { return a.length })) : 0)); return this._size };
epiviz.datatypes.GenomicRangeArray.prototype.concatValues = function(a, b) {
    var c;
    if (Array.isArray(this._strand) || Array.isArray(a._strand) || this._strand != a._strand) { c = Array.isArray(this._strand) ? this._strand : epiviz.utils.fillArray(this.size(), this._strand); var d = Array.isArray(a._strand) ? a._strand : epiviz.utils.fillArray(a.size(), a._strand);
        c = c.concat(d.slice(b)) } else c = this._strand;
    var d = this._id ? this._id.concat(a._id.slice(b)) : null,
        e = this._start.concat(a._start.slice(b)),
        f = this._end ? this._end.concat(a._end.slice(b)) :
        null,
        g = {},
        h;
    for (h in this._metadata) this._metadata.hasOwnProperty(h) && (g[h] = this._metadata[h].concat(a._metadata[h].slice(b)));
    return { id: d, start: e, end: f, strand: c, metadata: g }
};
epiviz.datatypes.GenomicRangeArray.prototype.trim = function(a) {
    if (void 0 == this.globalStartIndex() || !this.size() || !a || !this.boundaries() || this.boundaries().seqName() != a.seqName()) return null;
    var b = Math.max(this.boundaries().start(), a.start()),
        c = Math.min(this.boundaries().end(), a.end());
    if (c <= b) return null;
    a = epiviz.datatypes.GenomicRange.fromStartEnd(a.seqName(), b, c);
    for (var c = b = -1, d = 0; d < this.size(); ++d) 0 > b && this.end(d) >= a.start() && (b = d), this._start[d] < a.end() && (c = d + 1);
    if (c <= b) return null;
    var e;
    if (0 <=
        b && c >= b) { d = { id: this._id ? this._id.slice(b, c) : null, start: this._start.slice(b, c), end: this._end ? this._end.slice(b, c) : null, strand: Array.isArray(this._strand) ? this._strand.slice(b, c) : this._strand, metadata: {} }; for (e in this._metadata) this._metadata.hasOwnProperty(e) && (d.metadata[e] = this._metadata[e].slice(b, c));
        e = this.globalStartIndex() + b } else {
        d = { id: this._id ? [] : null, start: [], end: this._end ? [] : null, strand: Array.isArray(this._strand) ? [] : this._strand, metadata: {} };
        for (e in this._metadata) this._metadata.hasOwnProperty(e) &&
            (d.metadata[e] = []);
        e = null
    }
    return new epiviz.datatypes.GenomicRangeArray(this.measurement(), a, e, d)
};
epiviz.datatypes.GenomicRangeArray.prototype.ranges = function() { return this };
epiviz.datatypes.GenomicRangeArray.prototype.foreach = function(a) { for (var b = this.size(), c = 0; c < b && !a(this.get(c)); ++c); };
epiviz.datatypes.GenomicRangeArray.prototype.metadataColumns = function() { return this._metadata ? Object.keys(this._metadata) : [] };
epiviz.datatypes.GenomicRangeArray.prototype.id = function(a) { return this._id ? this._id[a] : this.globalStartIndex() + a };
epiviz.datatypes.GenomicRangeArray.prototype.start = function(a) { return this._start ? this._start[a] : void 0 };
epiviz.datatypes.GenomicRangeArray.prototype.end = function(a) { return this._end ? this._end[a] : this.start(a) };
epiviz.datatypes.GenomicRangeArray.prototype.strand = function(a) { return Array.isArray(this._strand) ? this._strand[a] : this._strand };
epiviz.datatypes.GenomicRangeArray.prototype.metadata = function(a, b) { return this._metadata && this._metadata[a] ? this._metadata[a][b] : null };
epiviz.datatypes.GenomicRangeArray.prototype.rowMetadata = function(a) { var b = {},
        c; for (c in this._metadata) this._metadata.hasOwnProperty(c) && (b[c] = this._metadata[c][a]); return b };
epiviz.datatypes.GenomicRangeArray.prototype.toString = function() {
    var a, b, c;
    this.boundaries() ? (a = this.boundaries().seqName(), b = this.boundaries().start(), c = this.boundaries().end()) : a = b = c = "*";
    a = sprintf("%25s", this.measurement().name().substr(0, 22)) + sprintf(" [%6s%10s%10s]", a, b, c);
    b = sprintf("%10s:", "id");
    c = sprintf("%10s:", "idx");
    var d = sprintf("%10s:", "chr"),
        e = sprintf("%10s:", "start"),
        f = sprintf("%10s:", "end");
    if (void 0 != this.globalStartIndex())
        for (var g = this.globalStartIndex(); g < this.globalStartIndex() +
            this.size(); ++g) { var h = this.getByGlobalIndex(g);
            b += sprintf("%10s", h.id());
            c += sprintf("%10s", g);
            d += sprintf("%10s", h.seqName());
            e += sprintf("%10s", h.start());
            f += sprintf("%10s", h.end()) }
    return [a, b, c, d, e, f].join("\n")
};
epiviz.datatypes.GenomicRangeArray.RowItemWrapper = function(a, b) { this._index = b;
    this._parent = a };
epiviz.datatypes.GenomicRangeArray.RowItemWrapper.prototype.parent = function() { return this._parent };
epiviz.datatypes.GenomicRangeArray.RowItemWrapper.prototype.id = function() { return this._parent.id(this._index) };
epiviz.datatypes.GenomicRangeArray.RowItemWrapper.prototype.seqName = function() { return this._parent.boundaries() ? this._parent.boundaries().seqName() : void 0 };
epiviz.datatypes.GenomicRangeArray.RowItemWrapper.prototype.start = function() { return this._parent.start(this._index) };
epiviz.datatypes.GenomicRangeArray.RowItemWrapper.prototype.end = function() { return this._parent.end(this._index) };
epiviz.datatypes.GenomicRangeArray.RowItemWrapper.prototype.index = function() { return this._index };
epiviz.datatypes.GenomicRangeArray.RowItemWrapper.prototype.globalIndex = function() { return this._index + this._parent.globalStartIndex() };
epiviz.datatypes.GenomicRangeArray.RowItemWrapper.prototype.equals = function(a) { return a ? this == a ? !0 : a.seqName() == this.seqName() && a.start() == this.start() && a.end() == this.end() : !1 };
epiviz.datatypes.GenomicRangeArray.RowItemWrapper.prototype.strand = function() { return this._parent.strand(this._index) };
epiviz.datatypes.GenomicRangeArray.RowItemWrapper.prototype.metadata = function(a) { return this._parent.metadata(a, this._index) };
epiviz.datatypes.GenomicRangeArray.RowItemWrapper.prototype.rowMetadata = function() { return this._parent.rowMetadata(this._index) };
epiviz.datatypes.GenomicRangeArray.RowItemWrapper.prototype.overlapsWith = function(a) { return a ? this == a ? !0 : this.seqName() != a.seqName() ? !1 : this.start() < a.end() && this.end() > a.start() : !1 };
epiviz.datatypes.FeatureValueArray = function(a, b, c, d) { var e;!d || $.isArray(d) ? (e = d, d = { values: d }) : e = d.values;
    epiviz.datatypes.GenomicArray.call(this, a, b, c, e);
    this._valuesAnnotation = d };
epiviz.datatypes.FeatureValueArray.prototype = epiviz.utils.mapCopy(epiviz.datatypes.GenomicArray.prototype);
epiviz.datatypes.FeatureValueArray.constructor = epiviz.datatypes.FeatureValueArray;
epiviz.datatypes.FeatureValueArray.prototype.createNew = function(a, b, c, d) { return new epiviz.datatypes.FeatureValueArray(a, b, c, d) };
epiviz.datatypes.FeatureValueArray.prototype.get = function(a) { return this._values[a] };
epiviz.datatypes.FeatureValueArray.prototype.getAnnotation = function(a) { if (void 0 == this._valuesAnnotation) return null; var b = {},
        c; for (c in this._valuesAnnotation) this._valuesAnnotation.hasOwnProperty(c) && (b[c] = this._valuesAnnotation[c][a]); return b };
epiviz.datatypes.FeatureValueArray.prototype.size = function() { return this._values ? this._values.length : 0 };
epiviz.datatypes.FeatureValueArray.prototype.concatValues = function(a, b) { if (!a || !a.size()) return this._valuesAnnotation;
    this._valuesAnnotation && this._valuesAnnotation.values || (this._valuesAnnotation = { values: [] }); var c = {},
        d; for (d in this._valuesAnnotation) this._valuesAnnotation.hasOwnProperty(d) && a._valuesAnnotation.hasOwnProperty(d) && (c[d] = this._valuesAnnotation[d].concat(a._valuesAnnotation[d].slice(b))); return c };
epiviz.datatypes.FeatureValueArray.prototype.trim = function(a, b, c) {
    if (void 0 == this.globalStartIndex() || !this.size() || void 0 == b || !a || !this.boundaries() || this.boundaries().seqName() != a.seqName()) return null;
    var d = Math.max(this.boundaries().start(), a.start()),
        e = Math.min(this.boundaries().end(), a.end());
    if (e <= d) return null;
    a = epiviz.datatypes.GenomicRange.fromStartEnd(a.seqName(), d, e);
    d = Math.max(b, this.globalStartIndex()) - this.globalStartIndex();
    b = Math.min(b + c, this.globalStartIndex() + this.size()) - this.globalStartIndex();
    if (b <= d) return null;
    c = {};
    for (var f in this._valuesAnnotation) this._valuesAnnotation.hasOwnProperty(f) && (c[f] = this._valuesAnnotation[f].slice(d, b));
    return new epiviz.datatypes.FeatureValueArray(this.measurement(), a, d + this.globalStartIndex(), c)
};
epiviz.datatypes.FeatureValueArray.prototype.toString = function() {
    var a, b, c;
    this.boundaries() ? (a = this.boundaries().seqName(), b = this.boundaries().start(), c = this.boundaries().end()) : a = b = c = "*";
    a = sprintf("%25s", this.measurement().name().substr(0, 22)) + sprintf(" [%6s%10s%10s]", a, b, c);
    b = sprintf("%10s:", "idx");
    c = sprintf("%10s:", "val");
    if (void 0 != this.globalStartIndex())
        for (var d = this.globalStartIndex(); d < this.globalStartIndex() + this.size(); ++d) {
            var e = this.getByGlobalIndex(d);
            b += sprintf("%10s", d);
            c += sprintf("%10s",
                e)
        }
    return [a, b, c].join("\n")
};
epiviz.datatypes.MeasurementGenomicDataWrapper = function(a, b) { this._measurement = a;
    this._container = b;
    this._globalStartIndex = this._size = null };
epiviz.datatypes.MeasurementGenomicDataWrapper.prototype.get = function(a) {
    var b = this._container.rowData(),
        c, d = this.globalStartIndex(),
        e = null,
        f = null,
        g = c = null,
        h = this.size();
    if (!h || a >= h || 0 > a) return new epiviz.datatypes.GenomicData.ValueItem(g, e, f, this._measurement, c);
    if (void 0 != d) {
        if (this._measurement.type() == epiviz.measurements.Measurement.Type.FEATURE || this._measurement.type() == epiviz.measurements.Measurement.Type.UNORDERED) c = this._container.values(this._measurement), e = d - c.globalStartIndex() + a, f = c.get(e),
            c = c.getAnnotation(e);
        e = d - b.globalStartIndex() + a;
        e = b.get(e);
        g = d + a
    }
    return new epiviz.datatypes.GenomicData.ValueItem(g, e, f, this._measurement, c)
};
epiviz.datatypes.MeasurementGenomicDataWrapper.prototype.getRow = function(a) { var b = this._container.rowData(),
        c = this.globalStartIndex(),
        d = null,
        e = this.size(); if (!e || a >= e || 0 > a) return d;
    void 0 != c && (a = c - b.globalStartIndex() + a, d = b.get(a)); return d };
epiviz.datatypes.MeasurementGenomicDataWrapper.prototype.measurement = function() { return this._measurement };
epiviz.datatypes.MeasurementGenomicDataWrapper.prototype.globalStartIndex = function() {
    if (null !== this._globalStartIndex) return this._globalStartIndex;
    var a, b = this._container.rowData().globalStartIndex();
    if (null === b) return b;
    if (this._measurement.type() == epiviz.measurements.Measurement.Type.FEATURE || this._measurement.type() == epiviz.measurements.Measurement.Type.UNORDERED) { a = this._container.values(this._measurement); if (!a.globalStartIndex()) return a.globalStartIndex();
        b = Math.max(b, a.globalStartIndex()) }
    return this._globalStartIndex =
        b
};
epiviz.datatypes.MeasurementGenomicDataWrapper.prototype.globalEndIndex = function() { var a = this.globalStartIndex(); return null == a ? null : a + this.size() };
epiviz.datatypes.MeasurementGenomicDataWrapper.prototype.size = function() { if (null !== this._size) return this._size; var a = this.globalStartIndex(); if (void 0 == a) return 0; var b = this._container.rowData(),
        c = this._container.values(this._measurement),
        b = b.size() - a + b.globalStartIndex(); if (this._measurement.type() == epiviz.measurements.Measurement.Type.FEATURE || this._measurement.type() == epiviz.measurements.Measurement.Type.UNORDERED) b = Math.min(b, c.size() - a + c.globalStartIndex()); return this._size = Math.max(0, b) };
epiviz.datatypes.MeasurementGenomicDataWrapper.prototype.getByGlobalIndex = function(a) { var b = this.globalStartIndex(); return void 0 == b ? new epiviz.datatypes.GenomicData.ValueItem(null, null, null, this._measurement, null) : this.get(a - b) };
epiviz.datatypes.MeasurementGenomicDataWrapper.prototype.getRowByGlobalIndex = function(a) { var b = this.globalStartIndex(); return void 0 == b ? null : this.getRow(a - b) };
epiviz.datatypes.MeasurementGenomicDataWrapper.prototype.binarySearchStarts = function(a) {
    var b = this._container.rowData();
    if (0 == this.size() || !b || 0 == b.size() || b.start(0) >= a.end() || b.start(b.size() - 1) <= a.start()) return { index: null, length: 0 };
    for (var c = 0, d = b.size() - 1, e, f = null; c <= d;) e = Math.floor(.5 * (c + d)), b.start(e) == a.start() ? (f = e, d = e - 1) : b.start(e) < a.start() ? c = e + 1 : d = e - 1;
    null === f && (f = c);
    for (var c = 0, d = b.size() - 1, g = null; c <= d;) e = Math.floor(.5 * (c + d)), b.start(e) == a.end() ? (g = e, c = e + 1) : b.start(e) < a.end() ? c = e + 1 : d =
        e - 1;
    null === g && (g = c - 1);
    a = Math.max(f + b.globalStartIndex(), this.globalStartIndex());
    b = Math.min(g + b.globalStartIndex(), this.globalStartIndex() + this.size() - 1);
    return { index: a - this.globalStartIndex(), length: b - a + 1 }
};
epiviz.datatypes.SeqInfo = function(a, b, c) { this.seqName = a;
    this.min = b;
    this.max = c };
epiviz.datatypes.SeqInfo.prototype.raw = function() { return [this.seqName, this.min, this.max] };
epiviz.datatypes.SeqInfo.fromRawObject = function(a) { return new epiviz.datatypes.SeqInfo(a[0], parseFloat(a[1]), parseFloat(a[2])) };
epiviz.datatypes.SeqInfo.compare = function(a, b) { if (a.seqName == b.seqName) return 0; if (void 0 == a.seqName) return -1; if (void 0 == b.seqName) return 1; var c = a.seqName.replace(/\D/g, ""),
        d = b.seqName.replace(/\D/g, ""); return "" == c || "" == d || !epiviz.utils.stringStartsWith(a.seqName, c) && !epiviz.utils.stringEndsWith(a.seqName, c) || !epiviz.utils.stringStartsWith(b.seqName, d) && !epiviz.utils.stringEndsWith(b.seqName, d) ? a.seqName < b.seqName ? -1 : a.seqName > b.seqName ? 1 : 0 : parseInt(c) - parseInt(d) };
epiviz.data.DataManager = function(a, b) {
    this._config = a;
    this._measurements = new epiviz.measurements.MeasurementSet;
    this._dataProviderFactory = b;
    this._cache = new epiviz.data.Cache(a, b);
    this._combinedRequestsStacks = {};
    this._requestAddMeasurements = new epiviz.events.Event;
    this._requestRemoveMeasurements = new epiviz.events.Event;
    this._requestAddChart = new epiviz.events.Event;
    this._requestRemoveChart = new epiviz.events.Event;
    this._requestPrintWorkspace = new epiviz.events.Event;
    this._requestLoadWorkspace = new epiviz.events.Event;
    this._requestAddSeqInfos = new epiviz.events.Event;
    this._requestRemoveSeqNames = new epiviz.events.Event;
    this._requestNavigate = new epiviz.events.Event;
    this._requestRe = new epiviz.events.Event;
    this._flushCache = new epiviz.events.Event;
    this._clearDatasourceGroupCache = new epiviz.events.Event;
    this._requestCurrentLocation = new epiviz.events.Event;
    this._requestGetChartSettings = new epiviz.events.Event;
    this._requestSetChartSettings = new epiviz.events.Event;
    this._requestGetAvailableCharts = new epiviz.events.Event;
    this._registerProviderAddMeasurements();
    this._registerProviderRemoveMeasurements();
    this._registerProviderAddChart();
    this._registerProviderRemoveChart();
    this._registerProviderPrintWorkspace();
    this._registerProviderLoadWorkspace();
    this._registerProviderAddSeqInfos();
    this._registerProviderRemoveSeqNames();
    this._registerProviderNavigate();
    this._registerProviderRe();
    this._registerProviderFlushCache();
    this._registerProviderClearDatasourceGroupCache();
    this._registerProviderGetCurrentLocation();
    this._registerProviderGetChartSettings();
    this._registerProviderSetChartSettings();
    this._registerProviderGetAvailableCharts()
};
epiviz.data.DataManager.prototype.onRequestAddMeasurements = function() { return this._requestAddMeasurements };
epiviz.data.DataManager.prototype.onRequestRemoveMeasurements = function() { return this._requestRemoveMeasurements };
epiviz.data.DataManager.prototype.onRequestAddChart = function() { return this._requestAddChart };
epiviz.data.DataManager.prototype.onRequestRemoveChart = function() { return this._requestRemoveChart };
epiviz.data.DataManager.prototype.onRequestPrintWorkspace = function() { return this._requestPrintWorkspace };
epiviz.data.DataManager.prototype.onRequestLoadWorkspace = function() { return this._requestLoadWorkspace };
epiviz.data.DataManager.prototype.onRequestAddSeqInfos = function() { return this._requestAddSeqInfos };
epiviz.data.DataManager.prototype.onRequestRemoveSeqNames = function() { return this._requestRemoveSeqNames };
epiviz.data.DataManager.prototype.onRequestNavigate = function() { return this._requestNavigate };
epiviz.data.DataManager.prototype.onRequestRe = function() { return this._requestRe };
epiviz.data.DataManager.prototype.onClearDatasourceGroupCache = function() { return this._clearDatasourceGroupCache };
epiviz.data.DataManager.prototype.onFlushCache = function() { return this._flushCache };
epiviz.data.DataManager.prototype.onRequestCurrentLocation = function() { return this._requestCurrentLocation };
epiviz.data.DataManager.prototype.onRequestGetChartSettings = function() { return this._requestGetChartSettings };
epiviz.data.DataManager.prototype.onRequestSetChartSettings = function() { return this._requestSetChartSettings };
epiviz.data.DataManager.prototype.onRequestGetAvailableCharts = function() { return this._requestGetAvailableCharts };
epiviz.data.DataManager.prototype.getSeqInfos = function(a) {
    var b = this,
        c = 0,
        d = {},
        e = [];
    this._dataProviderFactory.foreach(function(f) {
        f.getData(epiviz.data.Request.getSeqInfos(f.id()), function(f) {
            if (f = f.data())
                if (Array.isArray(f))
                    for (m = 0; m < f.length; ++m) f[m][0] in d || (e.push(epiviz.datatypes.SeqInfo.fromRawObject(f[m])), d[f[m][0]] = !0);
                else
                    for (var g = Object.keys(f), m = 0; m < g.length; m++) g[m] in d || (e.push(epiviz.datatypes.SeqInfo.fromRawObject([g[m], f[g[m]][0], f[g[m]][1]])), d[g[m]] = !0);
                ++c < b._dataProviderFactory.size() ||
                a(e.sort(epiviz.datatypes.SeqInfo.compare))
        })
    })
};
epiviz.data.DataManager.prototype.updateChartSettings = function(a) { this._dataProviderFactory.foreach(function(b) { if (b.id().includes("websocket-")) { var c = null;
            null != a.colorMap && (c = a.colorMap._colors);
            b.updateChartSettings(epiviz.data.Request.createRequest({ action: epiviz.data.Request.Action.SET_CHART_SETTINGS, settings: a.settings, colorMap: c, chartId: a.chartId }), function() {}) } }) };
epiviz.data.DataManager.prototype.getMeasurements = function(a) {
    var b = this,
        c = new epiviz.measurements.MeasurementSet,
        d = 0;
    this._dataProviderFactory.foreach(function(e) {
        e.getData(epiviz.data.Request.getMeasurements(e.id()), function(f) {
            if (f = f.data())
                for (var g = f.id ? f.id.length || 0 : 0, h = 0; h < g; ++h) c.add(new epiviz.measurements.Measurement(f.id[h], f.name[h], $.isArray(f.type) ? f.type[h] : f.type, $.isArray(f.datasourceId) ? f.datasourceId[h] : f.datasourceId, $.isArray(f.datasourceGroup) ? f.datasourceGroup[h] : f.datasourceGroup,
                    e.id(), null, $.isArray(f.defaultChartType) ? f.defaultChartType[h] : f.defaultChartType, f.annotation[h], $.isArray(f.minValue) ? f.minValue[h] : f.minValue, $.isArray(f.maxValue) ? f.maxValue[h] : f.maxValue, $.isArray(f.metadata) && $.isArray(f.metadata[0]) ? f.metadata[h] : f.metadata));
            ++d < b._dataProviderFactory.size() || a(c)
        })
    })
};
epiviz.data.DataManager.prototype.getData = function(a, b, c) { this._config.useCache ? this._cache.getData(a, b, c) : this._getDataNoCache(a, b, c) };
epiviz.data.DataManager.prototype._getDataNoCache = function(a, b, c) {
    var d = this,
        e = {},
        f;
    for (f in b)
        if (b.hasOwnProperty(f)) { var g = b[f].split(function(a) { return a.dataprovider() }),
                h; for (h in g)
                if (g.hasOwnProperty(h)) { var m = e[h];
                    void 0 == m ? e[h] = g[h] : m.addAll(g[h]) } }
    var l = {};
    epiviz.utils.forEach(e, function(e, f) {
        var g = e.split(function(a) { return a.datasource().id() }),
            h = epiviz.data.Request.getCombined(g, a),
            m = d._combinedRequestsStacks[f];
        void 0 == m && (m = new epiviz.data.RequestStack, d._combinedRequestsStacks[f] =
            m);
        m.pushRequest(h, function(e) {
            var h = {};
            epiviz.utils.forEach(g, function(b, c) { var d = b.first().datasource(),
                    f = e[c],
                    g = new epiviz.datatypes.PartialSummarizedExperiment,
                    l = f.globalStartIndex;
                isNaN(a._start) && (a._start = l);
                isNaN(a._width) && (a._width = f.rows.end[f.rows.end.length - 1] - a._start);
                d = new epiviz.datatypes.GenomicRangeArray(d, a, l, f.rows);
                g.addRowData(d);
                b.foreach(function(b) { b = new epiviz.datatypes.FeatureValueArray(b, a, l, f.cols[b.id()]);
                    g.addValues(b) });
                h[c] = g });
            l[f] = h;
            d._serveAvailableData(a, b, c,
                l)
        });
        (d._dataProviderFactory.get(f) || d._dataProviderFactory.get(epiviz.data.EmptyResponseDataProvider.DEFAULT_ID)).getData(h, function(a) { m.serveData(a) })
    })
};
epiviz.data.DataManager.prototype._serveAvailableData = function(a, b, c, d) { var e = [];
    epiviz.utils.forEach(b, function(a, b) { var f = !0,
            g = new epiviz.measurements.MeasurementHashtable;
        a.foreach(function(a) { if (!(a.dataprovider() in d)) return f = !1, !0; var b = new epiviz.datatypes.MeasurementGenomicDataWrapper(a, d[a.dataprovider()][a.datasource().id()]);
            g.put(a, b) }); if (f) { var l = new epiviz.datatypes.MapGenomicData(g);
            c(b, l);
            e.push(b) } });
    e.forEach(function(a) { delete b[a] }) };
epiviz.data.DataManager.prototype.getPCA = function(a, b, c) {
    var d = this,
        e = {},
        f;
    for (f in b)
        if (b.hasOwnProperty(f)) { var g = b[f].split(function(a) { return a.dataprovider() }),
                h; for (h in g)
                if (g.hasOwnProperty(h)) { var m = e[h];
                    void 0 == m ? e[h] = g[h] : m.addAll(g[h]) } }
    epiviz.utils.forEach(e, function(b, e) {
        var g = b.split(function(a) { return a.datasource().id() }),
            h = epiviz.data.Request.getPCA(g, a),
            l = Object.keys(g)[0];
        (d._dataProviderFactory.get(e) || d._dataProviderFactory.get(epiviz.data.EmptyResponseDataProvider.DEFAULT_ID)).getData(h,
            function(a) { var b = a.data(); "websocket" == a.data().dataprovidertype && (b = b[l]);
                c(f, b) })
    })
};
epiviz.data.DataManager.prototype.getDiversity = function(a, b, c) {
    var d = this,
        e = {},
        f;
    for (f in b)
        if (b.hasOwnProperty(f)) { var g = b[f].split(function(a) { return a.dataprovider() }),
                h; for (h in g)
                if (g.hasOwnProperty(h)) { var m = e[h];
                    void 0 == m ? e[h] = g[h] : m.addAll(g[h]) } }
    epiviz.utils.forEach(e, function(b, e) {
        var g = b.split(function(a) { return a.datasource().id() }),
            h = epiviz.data.Request.getDiversity(g, a),
            l = Object.keys(g)[0];
        (d._dataProviderFactory.get(e) || d._dataProviderFactory.get(epiviz.data.EmptyResponseDataProvider.DEFAULT_ID)).getData(h,
            function(a) { var b = a.data(); "websocket" == a.data().dataprovidertype && (b = b[l]);
                c(f, b) })
    })
};
epiviz.data.DataManager.prototype.getHierarchy = function(a, b) {
    for (var c in a)
        if (a.hasOwnProperty(c)) var d = a[c];
    var e = d.dataprovider;
    e || d.measurements.foreach(function(a) { return a.dataprovider() ? (e = a.dataprovider(), !0) : !1 });
    var f = d.datasourceGroup;
    f || d.measurements.foreach(function(a) { return a.datasourceGroup() ? (f = a.datasourceGroup(), !0) : !1 });
    (this._dataProviderFactory.get(e) || this._dataProviderFactory.get(epiviz.data.EmptyResponseDataProvider.DEFAULT_ID)).getData(epiviz.data.Request.getHierarchy(f, d.customData),
        function(a) { b(c, a.data()) })
};
epiviz.data.DataManager.prototype.propagateHierarchyChanges = function(a, b) {
    for (var c in a)
        if (a.hasOwnProperty(c)) {
            var d = a[c],
                e = d.dataprovider;
            e || d.measurements.foreach(function(a) { return a.dataprovider() ? (e = a.dataprovider(), !0) : !1 });
            var f = this._dataProviderFactory.get(e) || this._dataProviderFactory.get(epiviz.data.EmptyResponseDataProvider.DEFAULT_ID);
            (function(a, c, d) {
                c.getData(epiviz.data.Request.propagateHierarchyChanges(d.datasourceGroup, d.customData.selection, d.customData.order, d.customData.selectedLevels),
                    function(e) { setTimeout(function() { c.onRequestClearDatasourceGroupCache().notify({ datasourceGroup: d.datasourceGroup, result: new epiviz.events.EventResult });
                            c.onRequestRe().notify({ result: new epiviz.events.EventResult });
                            b(a, e.data()) }, 0) })
            })(c, f, d)
        }
};
epiviz.data.DataManager.prototype.getWorkspaces = function(a, b, c) { var d = this._dataProviderFactory.workspacesDataProvider(); if (!d) throw Error("Invalid data provider for workspaces (see Config.workspaceDataProvider)");
    d.getData(epiviz.data.Request.getWorkspaces(b, c), function(b) { b = b.data(); var c = []; if (b && b.length)
            for (var d = 0; d < b.length; ++d) c.push({ id: b[d].id, name: b[d].name, content: JSON.parse(b[d].content) });
        a(c) }) };
epiviz.data.DataManager.prototype.saveWorkspace = function(a, b, c) { var d = this._dataProviderFactory.workspacesDataProvider(); if (!d) throw Error("Invalid data provider for workspaces (see Config.workspaceDataProvider)");
    d.getData(epiviz.data.Request.saveWorkspace(a, b), function(a) { a = a.data();
        c(a) }) };
epiviz.data.DataManager.prototype.deleteWorkspace = function(a) { var b = this._dataProviderFactory.workspacesDataProvider(); if (!b) throw Error("Invalid data provider for workspaces (see Config.workspaceDataProvider)");
    b.getData(epiviz.data.Request.deleteWorkspace(a), function(a) { a.data() }) };
epiviz.data.DataManager.prototype.search = function(a, b) { var c = this,
        d = this._dataProviderFactory.size(),
        e = [];
    this._dataProviderFactory.foreach(function(f) { f.getData(epiviz.data.Request.search(b, c._config.maxSearchResults), function(b) {
            (b = b.data()) && epiviz.utils.arrayAppend(e, b);--d;
            d || a(e) }) }) };
epiviz.data.DataManager.prototype.flushCache = function() { this._cache.flush();
    this._flushCache.notify() };
epiviz.data.DataManager.prototype.clearDatasourceGroupCache = function(a) { this._cache.clearDatasourceGroupCache(a);
    this._clearDatasourceGroupCache.notify({ datasourceGroup: a }) };
epiviz.data.DataManager.prototype._registerProviderAddMeasurements = function() { var a = this;
    this._dataProviderFactory.foreach(function(b) { b.onRequestAddMeasurements().addListener(new epiviz.events.EventListener(function(b) { a._requestAddMeasurements.notify(b) })) }) };
epiviz.data.DataManager.prototype._registerProviderRemoveMeasurements = function() { var a = this;
    this._dataProviderFactory.foreach(function(b) { b.onRequestRemoveMeasurements().addListener(new epiviz.events.EventListener(function(b) { a._requestRemoveMeasurements.notify(b) })) }) };
epiviz.data.DataManager.prototype._registerProviderAddChart = function() { var a = this;
    this._dataProviderFactory.foreach(function(b) { b.onRequestAddChart().addListener(new epiviz.events.EventListener(function(b) { a._requestAddChart.notify(b) })) }) };
epiviz.data.DataManager.prototype._registerProviderRemoveChart = function() { var a = this;
    this._dataProviderFactory.foreach(function(b) { b.onRequestRemoveChart().addListener(new epiviz.events.EventListener(function(b) { a._requestRemoveChart.notify(b) })) }) };
epiviz.data.DataManager.prototype._registerProviderPrintWorkspace = function() { var a = this;
    this._dataProviderFactory.foreach(function(b) { b.onRequestPrintWorkspace().addListener(new epiviz.events.EventListener(function(b) { a._requestPrintWorkspace.notify(b) })) }) };
epiviz.data.DataManager.prototype._registerProviderLoadWorkspace = function() { var a = this;
    this._dataProviderFactory.foreach(function(b) { b.onRequestLoadWorkspace().addListener(new epiviz.events.EventListener(function(b) { a._requestLoadWorkspace.notify(b) })) }) };
epiviz.data.DataManager.prototype._registerProviderAddSeqInfos = function() { var a = this;
    this._dataProviderFactory.foreach(function(b) { b.onRequestAddSeqInfos().addListener(new epiviz.events.EventListener(function(b) { for (var c = [], e = 0; e < b.seqInfos.length; ++e) c.push(epiviz.datatypes.SeqInfo.fromRawObject(b.seqInfos[e]));
            a._requestAddSeqInfos.notify({ seqInfos: c, result: b.result }) })) }) };
epiviz.data.DataManager.prototype._registerProviderRemoveSeqNames = function() { var a = this;
    this._dataProviderFactory.foreach(function(b) { b.onRequestRemoveSeqNames().addListener(new epiviz.events.EventListener(function(b) { a._requestRemoveSeqNames.notify(b) })) }) };
epiviz.data.DataManager.prototype._registerProviderNavigate = function() { var a = this;
    this._dataProviderFactory.foreach(function(b) { b.onRequestNavigate().addListener(new epiviz.events.EventListener(function(b) { a._requestNavigate.notify(b) })) }) };
epiviz.data.DataManager.prototype._registerProviderRe = function() { var a = this;
    this._dataProviderFactory.foreach(function(b) { b.onRequestRe().addListener(new epiviz.events.EventListener(function(b) { a._requestRe.notify(b) })) }) };
epiviz.data.DataManager.prototype._registerProviderClearDatasourceGroupCache = function() { var a = this;
    this._dataProviderFactory.foreach(function(b) { b.onRequestClearDatasourceGroupCache().addListener(new epiviz.events.EventListener(function(b) { a.clearDatasourceGroupCache(b.datasourceGroup);
            b.result.success = !0 })) }) };
epiviz.data.DataManager.prototype._registerProviderFlushCache = function() { var a = this;
    this._dataProviderFactory.foreach(function(b) { b.onRequestFlushCache().addListener(new epiviz.events.EventListener(function(b) { a.flushCache();
            b.result.success = !0 })) }) };
epiviz.data.DataManager.prototype._registerProviderGetCurrentLocation = function() { var a = this;
    this._dataProviderFactory.foreach(function(b) { b.onRequestCurrentLocation().addListener(new epiviz.events.EventListener(function(b) { a._requestCurrentLocation.notify(b) })) }) };
epiviz.data.DataManager.prototype._registerProviderSetChartSettings = function() { var a = this;
    this._dataProviderFactory.foreach(function(b) { b.onRequestSetChartSettings().addListener(new epiviz.events.EventListener(function(b) { a._requestSetChartSettings.notify(b) })) }) };
epiviz.data.DataManager.prototype._registerProviderGetChartSettings = function() { var a = this;
    this._dataProviderFactory.foreach(function(b) { b.onRequestGetChartSettings().addListener(new epiviz.events.EventListener(function(b) { a._requestGetChartSettings.notify(b) })) }) };
epiviz.data.DataManager.prototype._registerProviderGetAvailableCharts = function() { var a = this;
    this._dataProviderFactory.foreach(function(b) { b.onRequestGetChartSettings().addListener(new epiviz.events.EventListener(function(b) { a._requestGetAvailableCharts.notify(b) })) }) };
epiviz.datatypes.ItemFilteredGenomicData = function(a, b) { epiviz.datatypes.MapGenomicData.call(this);
    this._data = a;
    this._filter = b;
    this._deferredInit = null;
    this._initialize() };
epiviz.datatypes.ItemFilteredGenomicData.prototype = epiviz.utils.mapCopy(epiviz.datatypes.MapGenomicData.prototype);
epiviz.datatypes.ItemFilteredGenomicData.constructor = epiviz.datatypes.ItemFilteredGenomicData;
epiviz.datatypes.ItemFilteredGenomicData.prototype._initialize = function() {
    if (this._deferredInit) return this._deferredInit;
    this._deferredInit = new epiviz.deferred.Deferred;
    var a = this,
        b = this._filter,
        c = this._data;
    c.ready(function() {
        b.preMark()(c).done(function(d) {
            var e = new epiviz.measurements.MeasurementHashtable,
                f = c.measurements();
            epiviz.utils.deferredFor(f.length, function(a) {
                var g = new epiviz.deferred.Deferred,
                    m = f[a],
                    l = [],
                    n = {};
                epiviz.utils.deferredFor(c.size(m), function(a) {
                    var e = new epiviz.deferred.Deferred,
                        f = c.get(m, a);
                    b.mark()(f, c, d).done(function(a) { a && (l.push(f), n[f.globalIndex] = f);
                        e.resolve() });
                    return e
                }).done(function() { e.put(m, new epiviz.datatypes.MeasurementGenomicDataArrayWrapper(m, l, n));
                    g.resolve() });
                return g
            }).done(function() { a._setMap(e);
                a._deferredInit.resolve() })
        })
    });
    return this._deferredInit
};
epiviz.datatypes.RowItemImpl = function(a, b, c, d, e, f, g) { this._id = a;
    this._seqName = b;
    this._start = c;
    this._end = d;
    this._globalIndex = e;
    this._strand = f;
    this._rowMetadata = g };
epiviz.datatypes.RowItemImpl.prototype.id = function() { return this._id };
epiviz.datatypes.RowItemImpl.prototype.seqName = function() { return this._seqName };
epiviz.datatypes.RowItemImpl.prototype.start = function() { return this._start };
epiviz.datatypes.RowItemImpl.prototype.end = function() { return this._end };
epiviz.datatypes.RowItemImpl.prototype.globalIndex = function() { return this._globalIndex };
epiviz.datatypes.RowItemImpl.prototype.strand = function() { return this._strand };
epiviz.datatypes.RowItemImpl.prototype.metadata = function(a) { a = this._rowMetadata[a]; return void 0 == a ? null : a };
epiviz.datatypes.RowItemImpl.prototype.rowMetadata = function() { return this._rowMetadata };
epiviz.datatypes.MeasurementAggregatedGenomicData = function(a, b, c) { epiviz.datatypes.MapGenomicData.call(this);
    this._data = a;
    this._groupByMarker = b;
    this._aggregator = c;
    this._deferredInit = null;
    this._initialize() };
epiviz.datatypes.MeasurementAggregatedGenomicData.prototype = epiviz.utils.mapCopy(epiviz.datatypes.MapGenomicData.prototype);
epiviz.datatypes.MeasurementAggregatedGenomicData.constructor = epiviz.datatypes.MeasurementAggregatedGenomicData;
epiviz.datatypes.MeasurementAggregatedGenomicData.prototype._initialize = function() {
    if (this._deferredInit) return this._deferredInit;
    this._deferredInit = new epiviz.deferred.Deferred;
    var a = this,
        b = this._groupByMarker,
        c = this._data;
    c.ready(function() {
        b.preMark()(c).done(function(d) {
            var e = new epiviz.measurements.MeasurementHashtable,
                f = {},
                g = c.measurements();
            epiviz.utils.deferredFor(g.length, function(a) {
                var e = new epiviz.deferred.Deferred,
                    h = g[a];
                b.mark()(h, c, d).done(function(a) {
                    a in f || (f[a] = []);
                    f[a].push(h);
                    e.resolve()
                });
                return e
            }).done(function() {
                var b = {},
                    d, g;
                for (d in f)
                    if (f.hasOwnProperty(d)) {
                        g = f[d];
                        var n = d + "-group",
                            p = d,
                            t = g[0].type(),
                            r = g[0].datasourceId(),
                            q = g[0].datasourceGroup(),
                            u = g[0].dataprovider(),
                            w = g[0].defaultChartType(),
                            v = epiviz.utils.mapCopy(g[0].annotation()),
                            z = g[0].minValue(),
                            A = g[0].maxValue(),
                            E = g[0].metadata(),
                            C = {};
                        E.forEach(function(a) { C[a] = a });
                        f[d].forEach(function(a) {
                            r != a.datasourceId() && (r = "*");
                            q != a.datasourceGroup() && (q = "*");
                            u != a.dataprovider() && (u = "*");
                            w != a.defaultChartType() && (w =
                                "*");
                            var b = a.annotation();
                            if (v != b)
                                if (void 0 == v) v = epiviz.utils.mapCopy(b);
                                else if (void 0 != b)
                                for (var c in b) b.hasOwnProperty(c) && (c in v ? v[c] != b[c] && (v[c] = "*") : v[c] = b[c]);
                            z = Math.min(z, a.minValue());
                            A = Math.max(A, a.maxValue());
                            a.metadata().forEach(function(a) { a in C || (C[a] = a, E.push(a)) })
                        });
                        b[d] = new epiviz.measurements.Measurement(n, p, t, r, q, u, null, w, v, z, A, E)
                    }
                for (d in f)
                    if (f.hasOwnProperty(d)) {
                        n = b[d];
                        p = [];
                        t = {};
                        g = f[d];
                        for (var B = Math.min.apply(void 0, g.map(function(a) { return c.globalStartIndex(a) })), G = Math.max.apply(void 0,
                                g.map(function(a) { return c.globalEndIndex(a) })), y = B; y < G; ++y) { var x = g.map(function(a) { return c.getByGlobalIndex(a, y) }).filter(function(a) { return a });
                            x.length && (B = x.map(function(a) { return a.value }), B = a._aggregator.aggregate(d, g, B), x = x[0].rowItem, x = new epiviz.datatypes.RowItemImpl(x.id(), x.seqName(), x.start(), x.end(), x.globalIndex(), x.strand(), x.rowMetadata() || {}), B = new epiviz.datatypes.GenomicData.ValueItem(y, x, B.value, n, { errMinus: B.errMinus, errPlus: B.errPlus }), p.push(B), t[y] = B) }
                        g = new epiviz.datatypes.MeasurementGenomicDataArrayWrapper(n,
                            p, t);
                        e.put(n, g)
                    }
                a._setMap(e);
                a._deferredInit.resolve()
            })
        })
    });
    return this._deferredInit
};
epiviz.datatypes.MeasurementOrderedGenomicData = function(a, b) { epiviz.datatypes.MapGenomicData.call(this);
    this._data = a;
    this._order = b;
    this._deferredInit = null;
    this._initialize() };
epiviz.datatypes.MeasurementOrderedGenomicData.prototype = epiviz.utils.mapCopy(epiviz.datatypes.MapGenomicData.prototype);
epiviz.datatypes.MeasurementOrderedGenomicData.constructor = epiviz.datatypes.MeasurementOrderedGenomicData;
epiviz.datatypes.MeasurementOrderedGenomicData.prototype._initialize = function() {
    if (this._deferredInit) return this._deferredInit;
    this._deferredInit = new epiviz.deferred.Deferred;
    var a = this,
        b = this._data,
        c = this._order;
    b.ready(function() {
        c.preMark()(b).done(function(d) {
            var e = new epiviz.measurements.MeasurementHashtable,
                f = b.measurements(),
                g = new epiviz.measurements.MeasurementHashtable;
            epiviz.utils.deferredFor(f.length, function(a) {
                var e = new epiviz.deferred.Deferred,
                    h = f[a];
                c.mark()(h, b, d).done(function(a) {
                    g.put(h,
                        a);
                    e.resolve()
                });
                return e
            }).done(function() { f.sort(function(a, b) { var c = g.get(a),
                        d = g.get(b); return c == d ? 0 : c < d ? -1 : 1 });
                f.forEach(function(a) { e.put(a, b.getSeries(a)) });
                a._setMap(e);
                a._deferredInit.resolve() })
        })
    });
    return this._deferredInit
};
epiviz.ui.charts.CustomSetting = function(a, b, c, d, e) { this.id = a;
    this.type = b;
    this.defaultValue = c;
    this.label = d || a;
    this.possibleValues = e || null };
epiviz.ui.charts.CustomSetting.Type = { NUMBER: "number", STRING: "string", ARRAY: "array", BOOLEAN: "boolean", CATEGORICAL: "categorical", MEASUREMENTS_METADATA: "measurementsMetadata", MEASUREMENTS_ANNOTATION: "measurementsAnnotation" };
epiviz.ui.charts.CustomSetting.DEFAULT = "default";
epiviz.ui.charts.VisEventArgs = function(a, b) { this.id = a;
    this.args = b };
epiviz.ui.charts.Axis = { X: "x", Y: "y" };
epiviz.ui.charts.Margins = function(a, b, c, d) { this._top = a;
    this._left = b;
    this._bottom = c;
    this._right = d };
epiviz.ui.charts.Margins.ZERO_MARGIN = new epiviz.ui.charts.Margins(0, 0, 0, 0);
epiviz.ui.charts.Margins.prototype.top = function() { return this._top };
epiviz.ui.charts.Margins.prototype.left = function() { return this._left };
epiviz.ui.charts.Margins.prototype.bottom = function() { return this._bottom };
epiviz.ui.charts.Margins.prototype.right = function() { return this._right };
epiviz.ui.charts.Margins.prototype.sumAxis = function(a) { switch (a) {
        case epiviz.ui.charts.Axis.X:
            return this._left + this._right;
        case epiviz.ui.charts.Axis.Y:
            return this._top + this._bottom;
        default:
            throw Error("Invalid argument: " + a); } };
epiviz.ui.charts.Margins.prototype.raw = function() { return { top: this._top, left: this._left, bottom: this._bottom, right: this._right } };
epiviz.ui.charts.Margins.fromRawObject = function(a) { return new epiviz.ui.charts.Margins(a.top, a.left, a.bottom, a.right) };
epiviz.ui.charts.Margins.prototype.copy = function() { return new epiviz.ui.charts.Margins(this._top, this._left, this._bottom, this._right) };
epiviz.ui.charts.Margins.prototype.equals = function(a) { return a ? this == a ? !0 : this._top == a._top && this._left == a._left && this._bottom == a._bottom && this._right == a._right : !1 };
epiviz.ui.charts.Visualization = function(a, b, c) {
    this._id = a;
    this._container = b;
    this._properties = c;
    this._originalMethods = {};
    this._hasModifiedMethods = !1;
    this._lastModifiedMethod = "";
    var d = this;
    if (c.modifiedMethods) {
        var e = new epiviz.deferred.Deferred,
            f = c.modifiedMethods,
            g = Object.keys(f),
            h = {},
            m = 0,
            l;
        for (l in f) f.hasOwnProperty(l) && "_setModifiedMethods" != l && function(a) { epiviz.caja.cajole(f[a], epiviz.caja.buildChartMethodContext()).done(function(b) { b && (h[a] = b, m += 1, m >= g.length && e.resolve()) }) }(l);
        e.done(function() {
            for (var a in h) h.hasOwnProperty(a) &&
                (d._originalMethods[a] = d[a], d[a] = h[a], d._lastModifiedMethod = a);
            d._hasModifiedMethods = !0;
            d.()
        })
    }
    this._customSettingsValues = {};
    for (a = 0; a < c.customSettingsDefs.length; ++a) switch (b = c.customSettingsDefs[a], l = c.customSettingsValues[b.id], b.type) {
        case epiviz.ui.charts.CustomSetting.Type.BOOLEAN:
            this._customSettingsValues[b.id] = !1 === l || l ? l : b.defaultValue;
            break;
        case epiviz.ui.charts.CustomSetting.Type.NUMBER:
            this._customSettingsValues[b.id] = 0 === l || l ? l : b.defaultValue;
            break;
        case epiviz.ui.charts.CustomSetting.Type.STRING:
            this._customSettingsValues[b.id] =
                "" === l || l ? l : b.defaultValue;
            break;
        case epiviz.ui.charts.CustomSetting.Type.MEASUREMENTS_METADATA:
            var n = {};
            c.visConfigSelection.measurements.foreach(function(a) { a.metadata().forEach(function(a) { n[a] = a }) });
            b.possibleValues = Object.keys(n);
            b.possibleValues.sort();
            l = l || b.defaultValue;
            this._customSettingsValues[b.id] = l in n ? l : b.possibleValues.length ? b.possibleValues[0] : "";
            break;
        case epiviz.ui.charts.CustomSetting.Type.MEASUREMENTS_ANNOTATION:
            n = { name: "name" };
            c.visConfigSelection.measurements.foreach(function(a) {
                (a =
                    a.annotation()) && Object.keys(a).forEach(function(a) { n[a] = a })
            });
            b.possibleValues = Object.keys(n);
            b.possibleValues.sort();
            l = l || b.defaultValue;
            this._customSettingsValues[b.id] = l in n ? l : b.possibleValues.length ? b.possibleValues[0] : "";
            break;
        default:
            this._customSettingsValues[b.id] = l || b.defaultValue
    }
    this._svgId = sprintf("%s-svg", this._id);
    this._lastRange = this._lastData = this._unalteredData = this._svg = null;
    this._slide = 0;
    this._zoom = 1;
    this._markers = c.chartMarkers;
    this._markersMap = {};
    this._markersIndices = {};
    this._markers.forEach(function(a,
        b) { a && (d._markersMap[a.id()] = a, d._markersIndices[a.id()] = b) });
    this._autoPropagateChanges = !0;
    this._hover = new epiviz.events.Event;
    this._unhover = new epiviz.events.Event;
    this._select = new epiviz.events.Event;
    this._deselect = new epiviz.events.Event;
    this._save = new epiviz.events.Event;
    this._remove = new epiviz.events.Event;
    this._colorsChanged = new epiviz.events.Event;
    this._methodsModified = new epiviz.events.Event;
    this._methodsReset = new epiviz.events.Event;
    this._markersModified = new epiviz.events.Event;
    this._customSettingsChanged =
        new epiviz.events.Event;
    this._sizeChanged = new epiviz.events.Event;
    this._marginsChanged = new epiviz.events.Event;
    this._dataWaitStart = new epiviz.events.Event;
    this._dataWaitEnd = new epiviz.events.Event
};
epiviz.ui.charts.Visualization.SVG_MARGIN = 20;
epiviz.ui.charts.Visualization.prototype._initialize = function() {
    "100%" == this._properties.height && (this._properties.height = this._container.height() - epiviz.ui.charts.Visualization.SVG_MARGIN);
    "100%" == this._properties.width && (this._properties.width = this._container.width() - epiviz.ui.charts.Visualization.SVG_MARGIN);
    var a = this.width(),
        b = this.height();
    this._container.addClass("visualization-container");
    this._container.append(sprintf('<svg id="%s" class="visualization" width="%s" height="%s"><style type="text/css"></style><defs></defs></svg>',
        this._svgId, a, b));
    this._svg = d3.select("#" + this._svgId);
    this._widthDif = $("#" + this._svgId).width() - (this._container.width() - epiviz.ui.charts.Visualization.SVG_MARGIN);
    this._heightDif = b - (this._container.height() - epiviz.ui.charts.Visualization.SVG_MARGIN);
    this._properties.width = a;
    this._properties.height = b;
    var c = this;
    this._container.click(function() { c._deselect.notify(new epiviz.ui.charts.VisEventArgs(c._id)) })
};
epiviz.ui.charts.Visualization.prototype._clearAxes = function(a) { a = a || this._svg;
    a.selectAll(".xAxis").remove();
    a.selectAll(".yAxis").remove() };
epiviz.ui.charts.Visualization.prototype._Axes = function(a, b, c, d, e, f, g, h, m, l, n, p, t, r) {
    e = e || this._svg;
    h = h || this.margins();
    g = g || this.height();
    f = f || this.width();
    var q = e.select(".axes"),
        u = q.select(".xAxis-grid");
    r = q.select(".yAxis-grid");
    var w = q.select(".xAxis-line");
    l = q.select(".yAxis-line");
    q.empty() && (q = e.append("g").attr("class", "axes"));
    u.empty() && (u = q.append("g").attr("class", "xAxis xAxis-grid"));
    r.empty() && (r = q.append("g").attr("class", "yAxis yAxis-grid"));
    w.empty() && (w = q.append("g").attr("class",
        "xAxis xAxis-line"));
    l.empty() && (l = q.append("g").attr("class", "yAxis yAxis-line"));
    a && (u.attr("transform", "translate(" + h.left() + ", " + h.top() + ")").selectAll("line.x").data(a.ticks(c)).enter().append("line").attr("x1", a).attr("x2", a).attr("y1", 0).attr("y2", g - h.top() - h.bottom()).style("stroke", "#eeeeee").style("shape-rendering", "crispEdges"), e = m || (n ? function(a) { return n[a] } : function(a) { return d3.format("s")(Math.round(1E3 * a) / 1E3) }), c = d3.svg.axis().scale(a).orient("bottom").ticks(c).tickFormat(e), w.attr("transform",
        "translate(" + h.left() + ", " + (g - h.bottom()) + ")").call(c), n && (g = "rotate(-90)", t && (g += "translate(0," + (a(.5) - a(0)) + ")"), w.selectAll("text").style("text-anchor", "end").attr("dx", "-.8em").attr("dy", "-0.5em").attr("transform", g)));
    b && (r.attr("transform", "translate(" + h.left() + ", " + h.top() + ")").selectAll("line.y").data(b.ticks(d - 1)).enter().append("line").attr("x1", 0).attr("x2", f - h.left() - h.right()).attr("y1", b).attr("y2", b).style("stroke", "#eeeeee").style("shape-rendering", "crispEdges"), a = p ? function(a) { return p[a] } :
        function(a) { return d3.format("s")(Math.round(1E3 * a) / 1E3) }, b = d3.svg.axis().ticks(d - 1).scale(b).orient("left").tickFormat(a), l.attr("transform", "translate(" + h.left() + ", " + h.top() + ")").call(b))
};
epiviz.ui.charts.Visualization.prototype._Title = function() { var a = this._svg.selectAll(".visualization-title"),
        b = epiviz.ui.charts.Visualization.CustomSettings;
    (b = this.customSettingsValues()[b.TITLE]) && "" != b.trim() ? (a.empty() && (a = this._svg.append("text").attr("class", "visualization-title").attr("text-anchor", "middle")), a.attr("x", .5 * this.width()).attr("y", 25).text(b)) : a.empty() || a.remove() };
epiviz.ui.charts.Visualization.prototype.resize = function(a, b) { a && (this._properties.width = a);
    b && (this._properties.height = b);
    this.();
    this._sizeChanged.notify(new epiviz.ui.charts.VisEventArgs(this._id, { width: this._properties.width, height: this._properties.height })) };
epiviz.ui.charts.Visualization.prototype.updateSize = function() { this.resize(this._widthDif + this._container.width() - epiviz.ui.charts.Visualization.SVG_MARGIN, this._heightDif + this._container.height() - epiviz.ui.charts.Visualization.SVG_MARGIN) };
epiviz.ui.charts.Visualization.prototype. = function(a, b) { void 0 != a && (this._lastRange = a);
    void 0 != b && (this._unalteredData = this._lastData = b, this._dataWaitEnd.notify(new epiviz.ui.charts.VisEventArgs(this._id)));
    this._svg.attr("width", this.width()).attr("height", this.height());
    this._Title(); return [] };
epiviz.ui.charts.Visualization.prototype.container = function() { return this._container };
epiviz.ui.charts.Visualization.prototype.id = function() { return this._id };
epiviz.ui.charts.Visualization.prototype.properties = function() { return this._properties };
epiviz.ui.charts.Visualization.prototype.height = function() { return this._properties.height };
epiviz.ui.charts.Visualization.prototype.width = function() { return this._properties.width };
epiviz.ui.charts.Visualization.prototype.margins = function() { return this._properties.margins };
epiviz.ui.charts.Visualization.prototype.colors = function() { return this._properties.colors };
epiviz.ui.charts.Visualization.prototype.setColors = function(a) { a && !a.equals(this._properties.colors) && (this._properties.colors = a, this.(), this._colorsChanged.notify(new epiviz.ui.charts.VisEventArgs(this._id, this._properties.colors))) };
epiviz.ui.charts.Visualization.prototype.colorLabels = function() { var a = Array(this.measurements().size());
    this.measurements().foreach(function(b, c) { a[c] = b.name() }); return a };
epiviz.ui.charts.Visualization.prototype.measurements = function() { return this.properties().visConfigSelection.measurements };
epiviz.ui.charts.Visualization.prototype.customSettingsValues = function() { return this._customSettingsValues };
epiviz.ui.charts.Visualization.prototype.setCustomSettingsValues = function(a) {
    if (this._customSettingsValues != a && a && !epiviz.utils.mapEquals(this._customSettingsValues, a)) {
        var b = epiviz.ui.charts.Visualization.CustomSettings,
            c = a[b.TITLE] || "",
            d = (this._customSettingsValues[b.TITLE] || "").trim().length,
            c = c.trim().length;
        if (!(d * c) && d + c) {
            var d = 20 * epiviz.utils.sign(c - d),
                c = a[b.MARGIN_TOP] || this._properties.margins.top(),
                e = a[b.MARGIN_LEFT] || this._properties.margins.left(),
                f = a[b.MARGIN_RIGHT] || this._properties.margins.right(),
                g = a[b.MARGIN_BOTTOM] || this._properties.margins.bottom();
            a[b.MARGIN_TOP] = c + d;
            a[b.MARGIN_LEFT] = e;
            a[b.MARGIN_RIGHT] = f;
            a[b.MARGIN_BOTTOM] = g
        }
        d = this._customSettingsValues[epiviz.ui.charts.ChartType.CustomSettings.MEASUREMENT_GROUPS_AGGREGATOR];
        c = a[epiviz.ui.charts.ChartType.CustomSettings.MEASUREMENT_GROUPS_AGGREGATOR];
        this._customSettingsValues = a;
        b.MARGIN_TOP in a && b.MARGIN_BOTTOM in a && b.MARGIN_LEFT in a && b.MARGIN_RIGHT in a && (this._properties.margins = new epiviz.ui.charts.Margins(a[b.MARGIN_TOP], a[b.MARGIN_LEFT],
            a[b.MARGIN_BOTTOM], a[b.MARGIN_RIGHT]), this._marginsChanged.notify(new epiviz.ui.charts.VisEventArgs(this._id, this._properties.margins)));
        if (d != c) { var h = this;
            this.transformData(this._lastRange, this._unalteredData).done(function() { h.() }) } else this.();
        this._customSettingsChanged.notify(new epiviz.ui.charts.VisEventArgs(this._id, a))
    }
};
epiviz.ui.charts.Visualization.prototype.setModifiedMethods = function(a) {
    var b = this,
        c = !1;
    if (a) {
        var d = Object.keys(a),
            e = new epiviz.deferred.Deferred,
            f = 0,
            g = {},
            h;
        for (h in a) a.hasOwnProperty(h) && "_setModifiedMethods" != h && this[h].toString() != a[h] && (h in this._originalMethods || (this._originalMethods[h] = this[h]), function(b) { epiviz.caja.cajole(a[b], epiviz.caja.buildChartMethodContext()).done(function(a) { a && (g[b] = a, c = !0, f += 1, f >= d.length && e.resolve()) }) }(h));
        e.done(function() {
            if (c) {
                for (var d in g) g.hasOwnProperty(d) &&
                    (b[d] = g[d], b._lastModifiedMethod = d);
                b._hasModifiedMethods = !0;
                b.();
                b._methodsModified.notify(new epiviz.ui.charts.VisEventArgs(b._id, a))
            }
        })
    }
};
epiviz.ui.charts.Visualization.prototype.hasModifiedMethods = function() { return this._hasModifiedMethods };
epiviz.ui.charts.Visualization.prototype.lastModifiedMethod = function() { return this._lastModifiedMethod };
epiviz.ui.charts.Visualization.prototype.resetModifiedMethods = function() { if (this._hasModifiedMethods) { for (var a in this._originalMethods) this._originalMethods.hasOwnProperty(a) && (this[a] = this._originalMethods[a]);
        this._hasModifiedMethods = !1;
        this.();
        this._methodsReset.notify(new epiviz.ui.charts.VisEventArgs(this._id)) } };
epiviz.ui.charts.Visualization.prototype.putMarker = function(a) {
    if (a) {
        var b;
        if (a.id() in this._markersMap) { b = this._markersIndices[a.id()]; var c = this._markers[b]; if (c == a || c.type() == a.type() && c.preMarkStr() == a.preMarkStr() && c.markStr() == a.markStr()) return;
            this._markers[b] = a } else b = this._markers.length, this._markers.push(a), this._markersIndices[a.id()] = b;
        this._markersMap[a.id()] = a;
        var d = this;
        this.transformData(this._lastRange, this._unalteredData).done(function() { d.() });
        this._markersModified.notify(new epiviz.ui.charts.VisEventArgs(this._id,
            this._markers))
    }
};
epiviz.ui.charts.Visualization.prototype.removeMarker = function(a) { if (a in this._markersMap) { this._markers[this._markersIndices[a]] = null;
        delete this._markersMap[a];
        delete this._markersIndices[a]; var b = this;
        this.transformData(this._lastRange, this._unalteredData).done(function() { b.() });
        this._markersModified.notify(new epiviz.ui.charts.VisEventArgs(this._id, this._markers)) } };
epiviz.ui.charts.Visualization.prototype.getMarker = function(a) { return a && a in this._markersMap ? this._markersMap[a] : null };
epiviz.ui.charts.Visualization.prototype.displayType = function() { throw Error("unimplemented abstract method"); };
epiviz.ui.charts.Visualization.prototype.autoPropagateChanges = function() { return this._autoPropagateChanges };
epiviz.ui.charts.Visualization.prototype.setAutoPropagateChanges = function(a) { this._autoPropagateChanges = a };
epiviz.ui.charts.Visualization.prototype.transformData = function(a, b) { var c = this._lastRange;
    void 0 != a && (this._lastRange = a);
    void 0 != b && (this._unalteredData = this._lastData = b);
    c && a && c.overlapsWith(a) && c.width() == a.width() && (this._slide = a.start() - c.start());
    c && a && c.overlapsWith(a) && c.width() != a.width() && (this._zoom = c.width() / a.width());
    c = new epiviz.deferred.Deferred;
    c.resolve(); return c };
epiviz.ui.charts.Visualization.prototype.onHover = function() { return this._hover };
epiviz.ui.charts.Visualization.prototype.onUnhover = function() { return this._unhover };
epiviz.ui.charts.Visualization.prototype.onSelect = function() { return this._select };
epiviz.ui.charts.Visualization.prototype.onDeselect = function() { return this._deselect };
epiviz.ui.charts.Visualization.prototype.doHover = function(a) { var b = this._container.find(".items"),
        c = b.find("> .hovered"),
        d = b.find("> .selected"),
        e = d.find("> .hovered"),
        f = function() { return a.overlapsWith(d3.select(this).data()[0]) },
        b = b.find("> .item").filter(f);
    c.append(b);
    b = d.find("> .item").filter(f);
    e.append(b) };
epiviz.ui.charts.Visualization.prototype.doUnhover = function() { var a = this._container.find(".items"),
        b = a.find("> .hovered"),
        c = a.find("> .selected"),
        d = c.find("> .hovered");
    a.prepend(b.children());
    c.prepend(d.children()) };
epiviz.ui.charts.Visualization.prototype.doSelect = function(a) { var b = this._container.find(".items"),
        c = b.find("> .hovered"),
        d = b.find("> .selected"),
        e = d.find("> .hovered"),
        f = function() { return a.overlapsWith(d3.select(this).data()[0]) },
        b = b.find("> .item").filter(f);
    d.append(b);
    b = c.find("> .item").filter(f);
    e.append(b) };
epiviz.ui.charts.Visualization.prototype.doDeselect = function() { var a = this._container.find(".items"),
        b = a.find("> .hovered"),
        c = a.find("> .selected"),
        d = c.find("> .hovered");
    a.prepend(c.find("> .item"));
    b.prepend(d.children()) };
epiviz.ui.charts.Visualization.prototype.onSave = function() { return this._save };
epiviz.ui.charts.Visualization.prototype.onRemove = function() { return this._remove };
epiviz.ui.charts.Visualization.prototype.onColorsChanged = function() { return this._colorsChanged };
epiviz.ui.charts.Visualization.prototype.onMethodsModified = function() { return this._methodsModified };
epiviz.ui.charts.Visualization.prototype.onMethodsReset = function() { return this._methodsReset };
epiviz.ui.charts.Visualization.prototype.onMarkersModified = function() { return this._markersModified };
epiviz.ui.charts.Visualization.prototype.onCustomSettingsChanged = function() { return this._customSettingsChanged };
epiviz.ui.charts.Visualization.prototype.onSizeChanged = function() { return this._sizeChanged };
epiviz.ui.charts.Visualization.prototype.onMarginsChanged = function() { return this._marginsChanged };
epiviz.ui.charts.Visualization.prototype.onDataWaitStart = function() { return this._dataWaitStart };
epiviz.ui.charts.Visualization.prototype.onDataWaitEnd = function() { return this._dataWaitEnd };
epiviz.ui.charts.Visualization.CustomSettings = { TITLE: "title", MARGIN_LEFT: "marginLeft", MARGIN_RIGHT: "marginRight", MARGIN_TOP: "marginTop", MARGIN_BOTTOM: "marginBottom", X_MIN: "xMin", X_MAX: "xMax", Y_MIN: "yMin", Y_MAX: "yMax", COL_LABEL: "colLabel", ROW_LABEL: "rowLabel" };
epiviz.ui.charts.VisualizationType = function(a) {
    var b = epiviz.Config.VisualizationPropertySettings;
    this._config = a;
    this._defaultSettings = epiviz.utils.mapCombine(epiviz.utils.mapCombine(a.chartSettings[this.typeName()], a.chartSettings[this.chartDisplayType()], !0), a.chartSettings["default"], !0);
    this._defaultWidth = this._defaultSettings[b.WIDTH];
    this._defaultHeight = this._defaultSettings[b.HEIGHT];
    this._defaultMargins = this._defaultSettings[b.MARGINS];
    this._defaultColors = a.colorPalettesMap[this._defaultSettings[b.COLORS]];
    this._decorations = this._defaultSettings[b.DECORATIONS];
    this._customSettingsValues = a.chartCustomSettings[this.typeName()] || null
};
epiviz.ui.charts.VisualizationType.DisplayType = { PLOT: "plot", TRACK: "track", DATA_STRUCTURE: "data-structure" };
epiviz.ui.charts.VisualizationType.prototype.createNew = function(a, b, c) { throw Error("unimplemented abstract method"); };
epiviz.ui.charts.VisualizationType.prototype.typeName = function() { throw Error("unimplemented abstract method"); };
epiviz.ui.charts.VisualizationType.prototype.chartName = function() { throw Error("unimplemented abstract method"); };
epiviz.ui.charts.VisualizationType.prototype.chartHtmlAttributeName = function() { throw Error("unimplemented abstract method"); };
epiviz.ui.charts.VisualizationType.prototype.chartDisplayType = function() { throw Error("unimplemented abstract method"); };
epiviz.ui.charts.VisualizationType.prototype.measurementsFilter = function() { return function(a) { return !0 } };
epiviz.ui.charts.VisualizationType.prototype.isRestrictedToSameDatasourceGroup = function() { return !1 };
epiviz.ui.charts.VisualizationType.prototype.isRestrictedToRangeMeasurements = function() { return !1 };
epiviz.ui.charts.VisualizationType.prototype.isRestrictedToFeatureMeasurements = function() { return !this.isRestrictedToRangeMeasurements() };
epiviz.ui.charts.VisualizationType.prototype.minSelectedMeasurements = function() { return 1 };
epiviz.ui.charts.VisualizationType.prototype.chartContainer = function() { return epiviz.ui.ControlManager.CHART_TYPE_CONTAINERS[this.chartDisplayType()] };
epiviz.ui.charts.VisualizationType.prototype.cssClass = function() { throw Error("unimplemented abstract method"); };
epiviz.ui.charts.VisualizationType.prototype.defaultWidth = function() { return this._defaultWidth };
epiviz.ui.charts.VisualizationType.prototype.defaultHeight = function() { return this._defaultHeight };
epiviz.ui.charts.VisualizationType.prototype.defaultMargins = function() { return this._defaultMargins };
epiviz.ui.charts.VisualizationType.prototype.defaultColors = function() { return this._defaultColors };
epiviz.ui.charts.VisualizationType.prototype.decorations = function() { return this._decorations };
epiviz.ui.charts.VisualizationType.prototype.customSettingsValues = function() { return this._customSettingsValues };
epiviz.ui.charts.VisualizationType.prototype.customSettingsDefs = function() {
    return [new epiviz.ui.charts.CustomSetting(epiviz.ui.charts.Visualization.CustomSettings.TITLE, epiviz.ui.charts.CustomSetting.Type.STRING, "", "Title"), new epiviz.ui.charts.CustomSetting(epiviz.ui.charts.Visualization.CustomSettings.MARGIN_TOP, epiviz.ui.charts.CustomSetting.Type.NUMBER, this._defaultMargins.top(), "Top margin"), new epiviz.ui.charts.CustomSetting(epiviz.ui.charts.Visualization.CustomSettings.MARGIN_BOTTOM, epiviz.ui.charts.CustomSetting.Type.NUMBER,
        this._defaultMargins.bottom(), "Bottom margin"), new epiviz.ui.charts.CustomSetting(epiviz.ui.charts.Visualization.CustomSettings.MARGIN_LEFT, epiviz.ui.charts.CustomSetting.Type.NUMBER, this._defaultMargins.left(), "Left margin"), new epiviz.ui.charts.CustomSetting(epiviz.ui.charts.Visualization.CustomSettings.MARGIN_RIGHT, epiviz.ui.charts.CustomSetting.Type.NUMBER, this._defaultMargins.right(), "Right margin")]
};
epiviz.ui.charts.markers = {};
epiviz.ui.charts.markers.VisualizationMarker = function(a, b, c, d, e) {
    this._type = a;
    this._id = b || epiviz.utils.generatePseudoGUID(6);
    this._name = c || "Custom Marker " + this._id;
    this._preMarkStr = d || "";
    this._markStr = e || "";
    var f = new epiviz.deferred.Deferred,
        g = null;
    epiviz.caja.cajole(this._preMarkStr).done(function(a) { g = a;
        f.resolve() });
    this._preMark = function(a) { var b = new epiviz.deferred.Deferred;
        f.done(function() { var c = g(a);
            b.resolve(c) }); return b };
    var h = new epiviz.deferred.Deferred,
        m = null;
    epiviz.caja.cajole(this._markStr).done(function(a) {
        m =
            a;
        h.resolve()
    });
    this._mark = function(a, b, c) { var d = new epiviz.deferred.Deferred;
        h.done(function() { var e = m(a, b, c);
            d.resolve(e) }); return d }
};
epiviz.ui.charts.markers.VisualizationMarker.prototype.type = function() { return this._type };
epiviz.ui.charts.markers.VisualizationMarker.prototype.id = function() { return this._id };
epiviz.ui.charts.markers.VisualizationMarker.prototype.name = function() { return this._name };
epiviz.ui.charts.markers.VisualizationMarker.prototype.preMark = function() { return this._preMark };
epiviz.ui.charts.markers.VisualizationMarker.prototype.mark = function() { return this._mark };
epiviz.ui.charts.markers.VisualizationMarker.prototype.preMarkStr = function() { return this._preMarkStr };
epiviz.ui.charts.markers.VisualizationMarker.prototype.markStr = function() { return this._markStr };
epiviz.ui.charts.markers.VisualizationMarker.Type = { FILTER: "filter", COLOR_BY_ROW: "colorByRow", ORDER_BY_MEASUREMENTS: "orderByMeasurements", COLOR_BY_MEASUREMENTS: "colorByMeasurements", GROUP_BY_MEASUREMENTS: "groupByMeasurements" };
epiviz.ui.charts.markers.VisualizationMarker.prototype.raw = function() { return { type: this._type, id: this._id, name: this._name, preMark: this._preMarkStr, mark: this._markStr } };
epiviz.ui.charts.markers.VisualizationMarker.fromRawObject = function(a) { return new epiviz.ui.charts.markers.VisualizationMarker(a.type, a.id, a.name, a.preMark, a.mark) };
epiviz.ui.charts.VisualizationProperties = function(a, b, c, d, e, f, g, h, m) { this.width = a;
    this.height = b;
    this.margins = c;
    this.visConfigSelection = d;
    this.colors = e;
    this.modifiedMethods = f;
    this.customSettingsValues = g || {};
    this.customSettingsDefs = h || [];
    this.chartMarkers = m || [] };
epiviz.ui.charts.VisualizationProperties.prototype.copy = function() {
    var a = new epiviz.ui.controls.VisConfigSelection(this.visConfigSelection.measurements ? new epiviz.measurements.MeasurementSet(this.visConfigSelection.measurements) : void 0, this.visConfigSelection.datasource, this.visConfigSelection.datasourceGroup, this.visConfigSelection.dataprovider, epiviz.utils.mapCopy(this.visConfigSelection.annotation), this.visConfigSelection.defaultChartType, this.visConfigSelection.minSelectedMeasurements);
    return new epiviz.ui.charts.VisualizationProperties(this.width,
        this.height, this.margins ? this.margins.copy() : this.margins, a, this.colors, this.modifiedMethods ? epiviz.utils.mapCopy(this.modifiedMethods) : this.modifiedMethods, this.customSettingsValues ? epiviz.utils.mapCopy(this.customSettingsValues) : this.customSettingsValues, this.customSettingsDefs ? this.customSettingsDefs.slice(0) : this.customSettingsDefs, this.chartMarkers.slice(0))
};
epiviz.workspaces = {};
epiviz.workspaces.Workspace = function(a, b, c) { this._id = a;
    this._name = b;
    this._range = c.range;
    this._chartsOrder = {};
    this._chartsById = {}; for (var d in c.charts)
        if (c.charts.hasOwnProperty(d))
            for (this._chartsOrder[d] = [], a = 0; a < c.charts[d].length; ++a) this._chartsById[c.charts[d][a].id] = c.charts[d][a], this._chartsOrder[d].push(c.charts[d][a].id);
    this._computedMeasurements = c.computedMeasurements || new epiviz.measurements.MeasurementSet;
    this._changed = !1;
    this._contentChanged = new epiviz.events.Event };
epiviz.workspaces.Workspace.DEFAULT_WORKSPACE_NAME = epiviz.Config.DEFAULT_WORKSPACE_NAME;
epiviz.workspaces.Workspace.prototype.id = function() { return this._id };
epiviz.workspaces.Workspace.prototype.name = function() { return this._name };
epiviz.workspaces.Workspace.prototype.range = function() { return this._range };
epiviz.workspaces.Workspace.prototype.charts = function() { var a = {},
        b; for (b in this._chartsOrder)
        if (this._chartsOrder.hasOwnProperty(b)) { a[b] = []; for (var c = 0; c < this._chartsOrder[b].length; ++c) a[b].push(this._chartsById[this._chartsOrder[b][c]]) }
    return a };
epiviz.workspaces.Workspace.prototype.chartsOrder = function() { return this._chartsOrder };
epiviz.workspaces.Workspace.prototype.computedMeasurements = function() { return this._computedMeasurements };
epiviz.workspaces.Workspace.prototype.chartAdded = function(a, b, c, d) { this._chartsById[a] = { id: a, type: b, properties: c.copy() };
    this._chartsOrder = d;
    this._setChanged() };
epiviz.workspaces.Workspace.prototype.chartRemoved = function(a, b) { this._chartsById[a] && (delete this._chartsById[a], this._chartsOrder = b, this._setChanged()) };
epiviz.workspaces.Workspace.prototype.chartSizeChanged = function(a, b, c) {!this._chartsById[a] || this._chartsById[a].properties.width == b && this._chartsById[a].properties.height == c || (this._chartsById[a].properties.width = b, this._chartsById[a].properties.height = c, this._setChanged()) };
epiviz.workspaces.Workspace.prototype.chartMarginsChanged = function(a, b) { this._chartsById[a].properties.margins.equals(b) || (this._chartsById[a].properties.margins = b ? b.copy() : b, this._setChanged()) };
epiviz.workspaces.Workspace.prototype.chartColorsChanged = function(a, b) { this._chartsById[a].properties.colors.equals(b) || (this._chartsById[a].properties.colors = b, this._setChanged()) };
epiviz.workspaces.Workspace.prototype.chartMethodsModified = function(a, b) { epiviz.utils.mapEquals(this._chartsById[a].properties.modifiedMethods, b) || (this._chartsById[a].properties.modifiedMethods = epiviz.utils.mapCombine(b, this._chartsById[a].properties.modifiedMethods), this._setChanged()) };
epiviz.workspaces.Workspace.prototype.chartMethodsReset = function(a) { this._chartsById[a].properties.modifiedMethods && 0 != Object.keys(this._chartsById[a].properties.modifiedMethods).length && (this._chartsById[a].properties.modifiedMethods = {}, this._setChanged()) };
epiviz.workspaces.Workspace.prototype.chartMarkersModified = function(a, b) { epiviz.utils.arraysEqual(this._chartsById[a].properties.chartMarkers, b) || (this._chartsById[a].properties.chartMarkers = b.filter(function(a) { return null != a }), this._setChanged()) };
epiviz.workspaces.Workspace.prototype.chartCustomSettingsChanged = function(a, b) { epiviz.utils.mapEquals(this._chartsById[a].properties.customSettingsValues, b) || (this._chartsById[a].properties.customSettingsValues = b ? epiviz.utils.mapCopy(b) : b, this._setChanged()) };
epiviz.workspaces.Workspace.prototype.locationChanged = function(a) { this._range.equals(a) || (this._range = a, this._setChanged()) };
epiviz.workspaces.Workspace.prototype.computedMeasurementsAdded = function(a) { var b = this._computedMeasurements.size();
    this._computedMeasurements.addAll(a);
    b != this._computedMeasurements.size() && this._setChanged() };
epiviz.workspaces.Workspace.prototype.computedMeasurementsRemoved = function(a) { var b = this._computedMeasurements.size();
    this._computedMeasurements.removeAll(a);
    b != this._computedMeasurements.size() && this._setChanged() };
epiviz.workspaces.Workspace.prototype.chartsOrderChanged = function(a) { this._chartsOrder = a;
    this._setChanged() };
epiviz.workspaces.Workspace.prototype.changed = function() { return this._changed };
epiviz.workspaces.Workspace.prototype.resetChanged = function() { this._changed = !1 };
epiviz.workspaces.Workspace.prototype._setChanged = function() { this._changed = !0;
    this._contentChanged.notify(this) };
epiviz.workspaces.Workspace.prototype.copy = function(a, b) { var c = this.charts(); return new epiviz.workspaces.Workspace(b || null, a, { range: this._range, computedMeasurements: new epiviz.measurements.MeasurementSet(this._computedMeasurements), charts: c }) };
epiviz.workspaces.Workspace.prototype.raw = function(a) {
    var b = new epiviz.measurements.MeasurementHashtable,
        c = {};
    this._computedMeasurements.foreach(function(a) { var c;
        a.componentMeasurements().foreach(function(a) { var c = b.get(a);
            null === c && (c = b.size(), b.put(a, c)) }); var d = a.formula().referredMeasurements,
            e; for (e in d) d.hasOwnProperty(e) && (c = b.get(d[e]), null === c && (c = b.size(), b.put(d[e], c)));
        c = b.get(a);
        null === c && (c = b.size(), b.put(a, c)) });
    for (var d in this._chartsOrder)
        if (this._chartsOrder.hasOwnProperty(d)) {
            c[d] = [];
            for (var e = 0; e < this._chartsOrder[d].length; ++e) {
                var f = this._chartsById[this._chartsOrder[d][e]],
                    g = f.properties,
                    h = [];
                (function(a) { g.visConfigSelection.measurements.foreach(function(c) { var d = b.get(c);
                        null === d && (d = b.size(), b.put(c, d));
                        a.push(d) }) })(h);
                c[d].push({
                    id: f.id,
                    type: f.type.typeName(),
                    properties: {
                        width: g.width,
                        height: g.height,
                        margins: g.margins.raw(),
                        visConfigSelection: {
                            measurements: h,
                            datasource: g.visConfigSelection.datasource,
                            datasourceGroup: g.visConfigSelection.datasourceGroup,
                            dataprovider: g.visConfigSelection.dataprovider,
                            annotation: g.visConfigSelection.annotation,
                            defaultChartType: g.visConfigSelection.defaultChartType,
                            minSelectedMeasurements: g.visConfigSelection.minSelectedMeasurements,
                            customData: g.visConfigSelection.customData
                        },
                        colors: g.colors.raw(a),
                        modifiedMethods: epiviz.utils.mapCopy(g.modifiedMethods),
                        customSettings: g.customSettingsValues || null,
                        chartMarkers: g.chartMarkers.map(function(a) { return a.raw() })
                    }
                })
            }
        }
    var m = Array(b.size());
    b.foreach(function(a, c) { m[c] = a.raw(b) });
    return {
        id: this._id,
        name: this._name,
        content: {
            range: this._range.raw(),
            measurements: m,
            charts: c
        }
    }
};
epiviz.workspaces.Workspace.fromRawObject = function(a, b, c) {
    var d, e = Array(a.content.measurements.length),
        f = new epiviz.measurements.MeasurementSet;
    for (d = 0; d < a.content.measurements.length; ++d) a.content.measurements[d].formula || (e[d] = epiviz.measurements.Measurement.fromRawObject(a.content.measurements[d]));
    for (d = 0; d < a.content.measurements.length; ++d) a.content.measurements[d].formula && (e[d] = epiviz.measurements.Measurement.fromRawObject(a.content.measurements[d], e), f.add(e[d]));
    var g = {},
        h;
    for (h in a.content.charts)
        if (a.content.charts.hasOwnProperty(h))
            for (g[h] = [], d = 0; d < a.content.charts[h].length; ++d) {
                var m = a.content.charts[h][d],
                    l, n = m.properties.visConfigSelection,
                    p = n ? n.measurements : m.properties.measurements;
                if (p) { l = new epiviz.measurements.MeasurementSet; for (var t = 0; t < p.length; ++t) l.add(e[p[t]]) }
                n = n ? new epiviz.ui.controls.VisConfigSelection(l, n.datasource, n.datasourceGroup, n.dataprovider, n.annotation, n.defaultChartType, n.minSelectedMeasurements, n.customData) : new epiviz.ui.controls.VisConfigSelection(l);
                (p = b.get(m.type)) && g[h].push({
                    id: m.id,
                    type: p,
                    properties: new epiviz.ui.charts.VisualizationProperties(m.properties.width,
                        m.properties.height, epiviz.ui.charts.Margins.fromRawObject(m.properties.margins), n, epiviz.ui.charts.ColorPalette.fromRawObject(m.properties.colors, c), m.properties.modifiedMethods, m.properties.customSettings, p.customSettingsDefs(), m.properties.chartMarkers ? m.properties.chartMarkers.map(function(a) { return epiviz.ui.charts.markers.VisualizationMarker.fromRawObject(a) }) : [])
                })
            }
        return new epiviz.workspaces.Workspace(a.id, a.name, {
            range: epiviz.datatypes.GenomicRange.fromRawObject(a.content.range),
            computedMeasurements: f,
            charts: g
        })
};
epiviz.workspaces.Workspace.prototype.onContentChanged = function() { return this._contentChanged };
epiviz.ui.controls.Dialog = function(a, b) { this._container = $("#dialogs");
    this._title = a;
    this._id = epiviz.ui.controls.Dialog.generateId();
    this._handlers = b;
    this._container.append(sprintf('<div id="%s" title="%s" style="display: none;"></div>', this._id, this._title));
    this._dialog = null };
epiviz.ui.controls.Dialog._nextIdIndex = 0;
epiviz.ui.controls.Dialog.generateId = function() { return sprintf("dialog-%s", epiviz.utils.generatePseudoGUID(5)) };
epiviz.ui.controls.Dialog.prototype.show = function() {};
epiviz.ui.controls.MessageDialog = function(a, b, c, d) { epiviz.ui.controls.Dialog.call(this, a, b);
    this._message = c;
    this._icon = d || epiviz.ui.controls.MessageDialog.Icon.INFO };
epiviz.ui.controls.MessageDialog.prototype = epiviz.utils.mapCopy(epiviz.ui.controls.Dialog.prototype);
epiviz.ui.controls.MessageDialog.constructor = epiviz.ui.controls.MessageDialog;
epiviz.ui.controls.MessageDialog.Icon = { INFO: "info", ERROR: "error", QUESTION: "question" };
epiviz.ui.controls.MessageDialog.prototype.show = function() {
    epiviz.ui.controls.Dialog.prototype.show.call(this);
    var a = epiviz.ui.controls.MessageDialog.Icon;
    if (!this._dialog) {
        var b = this;
        this._dialog = $("#" + this._id);
        this._dialog.css("display", "inline");
        this._dialog.append(sprintf('<div class="ui-state-%s ui-corner-all" style="margin: 5px; padding: 5px; height: auto;"><div class="ui-icon ui-icon-%s" style="float: left; margin-right: 5px;"></div><div class="dialog-text">%s</div></div>', this._icon == a.ERROR ?
            "error" : "highlight", this._icon == a.ERROR ? "alert" : "info", this._message));
        var c = {},
            d;
        for (d in this._handlers) this._handlers.hasOwnProperty(d) && function(a) { c[a] = function() { b._handlers[a]();
                $(this).dialog("close") } }(d);
        this._dialog.dialog({ autoOpen: !1, resizable: !1, buttons: c, modal: !0 });
        this._dialog.dialog({ close: function(a, c) { $(this).remove();
                b._dialog = null } })
    }
    this._dialog.dialog("open");
    this._dialog.dialog("option", "position", "center")
};
epiviz.EpiViz = function(a, b, c, d, e, f, g, h, m, l, n) {
    this._config = a;
    this._locationManager = b;
    this._measurementsManager = c;
    this._controlManager = d;
    this._dataManager = e;
    this._chartFactory = f;
    this._chartManager = g;
    this._workspaceManager = h;
    this._userManager = m;
    this._webArgsManager = l;
    this._cookieManager = n;
    this._registerRequestSeqInfos();
    this._registerRequestMeasurements();
    this._registerUiAddChart();
    this._registerUiSaveWorkspace();
    this._registerUiDeleteActiveWorkspace();
    this._registerUiRevertActiveWorkspace();
    this._registerUiLoginLinkClicked();
    this._registerUiSearchWorkspaces();
    this._registerUiActiveWorkspaceChanged();
    this._registerUiSearch();
    this._registerChartRequestHierarchy();
    this._registerChartPropagateHierarchySelection();
    this._registerChartPropogateIcicleLocationChange();
    this._registerUiSettingsChanged();
    this._registerDataAddMeasurements();
    this._registerDataRemoveMeasurements();
    this._registerDataAddChart();
    this._registerDataRemoveChart();
    this._registerDataAddSeqInfos();
    this._registerDataRemoveSeqNames();
    this._registerDataNavigate();
    this._registerDataRe();
    this._registerDataGetCurrentLocation();
    this._registerPrintWorkspace();
    this._registerLoadWorkspace();
    this._registerDataSetChartSettings();
    this._registerDataGetChartSettings();
    this._registerDataGetAvailableCharts();
    this._registerRequestWorkspaces();
    this._registerWorkspacesLoaded();
    this._registerActiveWorkspaceChanged();
    this._registerActiveWorkspaceContentChanged();
    this._registerLocationChanged()
};
epiviz.EpiViz.VERSION = "4";
epiviz.EpiViz.prototype.start = function() { this._cookieManager.initialize();
    this._controlManager.initialize();
    this._workspaceManager.initialize();
    this._measurementsManager.initialize();
    this._locationManager.initialize() };
epiviz.EpiViz.prototype.config = function() { return this._config };
epiviz.EpiViz.prototype._addChart = function(a, b, c, d) {
    c = this._chartManager.addChart(a, b, c, d);
    var e = this;
    if ("epiviz.plugins.charts.CustomScatterPlot" == a.typeName()) { var f = null;
        a = {};
        a[c] = b.measurements;
        this._dataManager.getPCA(f, a, function(a, b) { e._chartManager.updateCharts(f, b, [a]) }) } else "epiviz.plugins.charts.DiversityScatterPlot" == a.typeName() ? (f = null, a = {}, a[c] = b.measurements, this._dataManager.getDiversity(f, a, function(a, b) { e._chartManager.updateCharts(f, b, [a]) })) : a.chartDisplayType() == epiviz.ui.charts.VisualizationType.DisplayType.DATA_STRUCTURE ?
        (a = {}, a[c] = b, f = this._workspaceManager.activeWorkspace().range(), this._dataManager.getHierarchy(a, function(a, b) { e._chartManager.updateCharts(f, b, [a]) })) : (f = this._workspaceManager.activeWorkspace().range(), this._chartManager.dataWaitStart(c), a = {}, a[c] = b.measurements, this._dataManager.getData(f, a, function(a, b) { e._chartManager.updateCharts(f, b, [a]) }));
    return c
};
epiviz.EpiViz.prototype._registerRequestSeqInfos = function() { var a = this;
    this._locationManager.onRequestSeqInfos().addListener(new epiviz.events.EventListener(function() { a._dataManager.getSeqInfos(function(b) { a._locationManager.updateSeqInfos(b) }) })) };
epiviz.EpiViz.prototype._registerRequestMeasurements = function() { var a = this;
    this._measurementsManager.onRequestMeasurements().addListener(new epiviz.events.EventListener(function() { a._dataManager.getMeasurements(function(b) { a._measurementsManager.addMeasurements(b) }) })) };
epiviz.EpiViz.prototype._registerRequestWorkspaces = function() {
    var a = this;
    this._workspaceManager.onRequestWorkspaces().addListener(new epiviz.events.EventListener(function(b) {
        var c = a._cookieManager.getWorkspace(a._chartFactory, a._config);
        a._dataManager.getWorkspaces(function(d) {
            for (var e = [], f = null, g = null, h = 0; h < d.length; ++h) {
                var m = epiviz.workspaces.Workspace.fromRawObject(d[h], a._chartFactory, a._config);
                null === m.id() ? f = m : (m.id() == b.activeWorkspaceId && (c && c.id() == b.activeWorkspaceId && (g = m, m = c), f = m),
                    e.push(m))
            }
            a._workspaceManager.updateWorkspaces(e, f, b.activeWorkspaceId, g);
            c || a._workspaceManager.activeWorkspace().resetChanged()
        }, "", b.activeWorkspaceId)
    }))
};
epiviz.EpiViz.prototype._registerUiAddChart = function() { var a = this;
    this._controlManager.onAddChart().addListener(new epiviz.events.EventListener(function(b) { a._addChart(b.type, b.visConfigSelection) })) };
epiviz.EpiViz.prototype._registerUiSaveWorkspace = function() { var a = this;
    this._controlManager.onSaveWorkspace().addListener(new epiviz.events.EventListener(function(b) { var c = a._workspaceManager.getByName(b.name),
            c = c ? a._workspaceManager.activeWorkspace().copy(b.name, c.id()) : a._workspaceManager.activeWorkspace().copy(b.name);
        a._dataManager.saveWorkspace(c, a._config, function(b) { c = c.copy(c.name(), b);
            c.resetChanged();
            a._workspaceManager.updateWorkspace(c);
            a._workspaceManager.changeActiveWorkspace(b) }) })) };
epiviz.EpiViz.prototype._registerUiDeleteActiveWorkspace = function() { var a = this;
    this._controlManager.onDeleteActiveWorkspace().addListener(new epiviz.events.EventListener(function() { a._dataManager.deleteWorkspace(a._workspaceManager.activeWorkspace());
        a._workspaceManager.deleteActiveWorkspace() })) };
epiviz.EpiViz.prototype._registerUiRevertActiveWorkspace = function() { var a = this;
    this._controlManager.onRevertActiveWorkspace().addListener(new epiviz.events.EventListener(function() { a._workspaceManager.revertActiveWorkspace() })) };
epiviz.EpiViz.prototype._registerUiLoginLinkClicked = function() { var a = this;
    this._controlManager.onLoginLinkClicked().addListener(new epiviz.events.EventListener(function() { a._userManager.toggleLogin() })) };
epiviz.EpiViz.prototype._registerUiSearchWorkspaces = function() { var a = this;
    this._controlManager.onSearchWorkspaces().addListener(new epiviz.events.EventListener(function(b) { a._dataManager.getWorkspaces(function(a) { b.callback(a) }, b.searchTerm, b.searchTerm) })) };
epiviz.EpiViz.prototype._registerUiActiveWorkspaceChanged = function() {
    var a = this;
    this._controlManager.onActiveWorkspaceChanged().addListener(new epiviz.events.EventListener(function(b) {
        var c = function() {
            b.newValue.id && !a._workspaceManager.get(b.newValue.id) ? a._dataManager.getWorkspaces(function(c) { for (var d = null, f = 0; f < c.length; ++f) { var g = epiviz.workspaces.Workspace.fromRawObject(c[f], a._chartFactory, a._config); if (null === g.id()) { d = g; break } }
                    d && a._workspaceManager.changeActiveWorkspace(b.newValue.id, d) },
                b.newValue.name, b.newValue.id) : a._workspaceManager.changeActiveWorkspace(b.newValue.id)
        };
        epiviz.workspaces.UserManager.USER_STATUS.loggedIn && !a._workspaceManager.activeWorkspaceChanging() && a._workspaceManager.activeWorkspace().changed() ? (new epiviz.ui.controls.MessageDialog("Discard workspace changes", { Yes: function() { c() }, No: function() { b.cancel() } }, "There are unsaved changes in the current workspace. Do you wish to discard them?", epiviz.ui.controls.MessageDialog.Icon.QUESTION)).show() : c()
    }))
};
epiviz.EpiViz.prototype._registerUiSearch = function() { var a = this;
    this._controlManager.onSearch().addListener(new epiviz.events.EventListener(function(b) { a._dataManager.search(function(a) { b.callback(a) }, b.searchTerm) })) };
epiviz.EpiViz.prototype._registerChartRequestHierarchy = function() { var a = this;
    this._chartManager.onChartRequestHierarchy().addListener(new epiviz.events.EventListener(function(b) { var c = {};
        c[b.id] = b.args;
        a._dataManager.getHierarchy(c, function(b, c) { a._chartManager.updateCharts(void 0, c, [b]) }) })) };
epiviz.EpiViz.prototype._registerChartPropagateHierarchySelection = function() { var a = this;
    this._chartManager.onChartPropagateHierarchyChanges().addListener(new epiviz.events.EventListener(function(b) { var c = {};
        c[b.id] = b.args;
        a._dataManager.propagateHierarchyChanges(c, function(b, c) { a._chartManager.updateCharts(void 0, c, [b]) }) })) };
epiviz.EpiViz.prototype._registerUiSettingsChanged = function() { var a = this;
    this._workspaceManager.onUiChartSettingsChanged().addListener(new epiviz.events.EventListener(function(b) { a._dataManager.updateChartSettings(b) })) };
epiviz.EpiViz.prototype._registerDataAddMeasurements = function() { var a = this;
    this._dataManager.onRequestAddMeasurements().addListener(new epiviz.events.EventListener(function(b) { try { a._measurementsManager.addMeasurements(b.measurements), b.result.success = !0 } catch (c) { b.result.success = !1, b.result.errorMessage = c.toString() } })) };
epiviz.EpiViz.prototype._registerDataRemoveMeasurements = function() { var a = this;
    this._dataManager.onRequestRemoveMeasurements().addListener(new epiviz.events.EventListener(function(b) { try { a._measurementsManager.removeMeasurements(b.measurements), b.result.success = !0 } catch (c) { b.result.success = !1, b.result.errorMessage = c.toString() } })) };
epiviz.EpiViz.prototype._registerDataAddChart = function() { var a = this;
    this._dataManager.onRequestAddChart().addListener(new epiviz.events.EventListener(function(b) { try { var c = a._chartFactory.get(b.type),
                d = a._addChart(c, b.visConfigSelection);
            b.result.success = !0;
            b.result.value = { id: d } } catch (e) { b.result.success = !1, b.result.errorMessage = e.toString() } })) };
epiviz.EpiViz.prototype._registerDataRemoveChart = function() { var a = this;
    this._dataManager.onRequestRemoveChart().addListener(new epiviz.events.EventListener(function(b) { try { a._chartManager.removeChart(b.id), b.result.success = !0 } catch (c) { b.result.success = !1, b.errorMessage = c.toString() } })) };
epiviz.EpiViz.prototype._registerPrintWorkspace = function() { this._dataManager.onRequestPrintWorkspace().addListener(new epiviz.events.EventListener(function(a) { try {
            (new epiviz.ui.PrintManager(a.chartId, a.fileName, a.fileType)).print(), a.result.success = !0 } catch (b) { a.result.success = !1, a.errorMessage = b.toString() } })) };
epiviz.EpiViz.prototype._registerLoadWorkspace = function() { var a = this;
    this._dataManager.onRequestLoadWorkspace().addListener(new epiviz.events.EventListener(function(b) { try { a._workspaceManager._requestWorkspaces.notify({ activeWorkspaceId: b.workspace }) } catch (c) { b.result.success = !1, b.errorMessage = c.toString() } })) };
epiviz.EpiViz.prototype._registerDataSetChartSettings = function() { var a = this;
    this._dataManager.onRequestSetChartSettings().addListener(new epiviz.events.EventListener(function(b) { try { a._chartManager.setChartSettings(b.chartId, b.settings, b.colorMap), b.result.success = !0 } catch (c) { b.result.success = !1, b.result.errorMessage = c.toString() } })) };
epiviz.EpiViz.prototype._registerDataGetChartSettings = function() { var a = this;
    this._dataManager.onRequestGetChartSettings().addListener(new epiviz.events.EventListener(function(b) { try { a._chartManager.getChartSettings(b.chartId), b.result.success = !0 } catch (c) { b.result.success = !1, b.result.errorMessage = c.toString() } })) };
epiviz.EpiViz.prototype._registerDataGetAvailableCharts = function() { var a = this;
    this._dataManager.onRequestGetChartSettings().addListener(new epiviz.events.EventListener(function(b) { try { b.result.value = [], a._chartFactory.foreach(function(a, d) { b.result.value.push({ chartName: a, customSettings: d.customSettingsDefs(), colorMap: d.defaultColors()._colors }) }), b.result.success = !0 } catch (c) { b.result.success = !1, b.result.errorMessage = c.toString() } })) };
epiviz.EpiViz.prototype._registerDataAddSeqInfos = function() { var a = this;
    this._dataManager.onRequestAddSeqInfos().addListener(new epiviz.events.EventListener(function(b) { try { a._locationManager.addSeqInfos(b.seqInfos), b.result.success = !0 } catch (c) { b.result.success = !1, b.errorMessage = c.toString() } })) };
epiviz.EpiViz.prototype._registerDataRemoveSeqNames = function() { var a = this;
    this._dataManager.onRequestRemoveSeqNames().addListener(new epiviz.events.EventListener(function(b) { try { a._locationManager.removeSeqNames(b.seqNames), b.result.success = !0 } catch (c) { b.result.success = !1, b.errorMessage = c.toString() } })) };
epiviz.EpiViz.prototype._registerDataNavigate = function() { var a = this;
    this._dataManager.onRequestNavigate().addListener(new epiviz.events.EventListener(function(b) { try { a._locationManager.changeCurrentLocation(b.range), b.result.success = !0 } catch (c) { b.result.success = !1, b.errorMessage = c.toString() } })) };
epiviz.EpiViz.prototype._registerDataRe = function() { var a = this;
    this._dataManager.onRequestRe().addListener(new epiviz.events.EventListener(function(b) { try { var c = a._locationManager.currentLocation();
            a._locationManager.changeCurrentLocation(c);
            b.result.success = !0;
            a._chartManager.updateDataStructureCharts() } catch (d) { b.result.success = !1, b.errorMessage = d.toString() } })) };
epiviz.EpiViz.prototype._registerDataGetCurrentLocation = function() { var a = this;
    this._dataManager.onRequestCurrentLocation().addListener(new epiviz.events.EventListener(function(b) { try { var c = a._locationManager.currentLocation();
            b.result.value = { seqName: c.seqName(), start: c.start(), end: c.end() };
            b.result.success = !0 } catch (d) { b.result.success = !1, b.errorMessage = d.toString() } })) };
epiviz.EpiViz.prototype._registerWorkspacesLoaded = function() { this._workspaceManager.onWorkspacesLoaded().addListener(new epiviz.events.EventListener(function(a) {})) };
epiviz.EpiViz.prototype._registerActiveWorkspaceChanged = function() {
    var a = this;
    this._workspaceManager.onActiveWorkspaceChanged().addListener(new epiviz.events.EventListener(function(b) {
        a._workspaceManager.startChangingActiveWorkspace();
        a._controlManager.updateSelectedWorkspace({ id: b.newValue.id(), name: b.newValue.name() });
        a._locationManager.changeCurrentLocation(b.newValue.range());
        a._measurementsManager.removeMeasurements(a._measurementsManager.computedMeasurements());
        a._measurementsManager.addMeasurements(b.newValue.computedMeasurements());
        a._chartManager.clear();
        b = b.newValue.charts();
        for (var c in b)
            if (b.hasOwnProperty(c))
                for (var d = 0; d < b[c].length; ++d) a._addChart(b[c][d].type, b[c][d].properties.visConfigSelection, b[c][d].id, b[c][d].properties.copy());
        a._workspaceManager.endChangingActiveWorkspace()
    }))
};
epiviz.EpiViz.prototype._registerActiveWorkspaceContentChanged = function() { var a = this;
    this._workspaceManager.onActiveWorkspaceContentChanged().addListener(new epiviz.events.EventListener(function(b) { a._cookieManager.saveWorkspace(b, a._config) })) };
epiviz.EpiViz.prototype._registerLocationChanged = function() {
    var a = this;
    this._locationManager.onCurrentLocationChanged().addListener(new epiviz.events.EventListener(function(b) {
        a._chartManager.dataWaitStart(void 0, function(a) { return a.displayType() != epiviz.ui.charts.VisualizationType.DisplayType.DATA_STRUCTURE });
        var c = a._chartManager.chartsMeasurements(),
            d;
        for (d in c) - 1 == d.indexOf("pca_scatter") && -1 == d.indexOf("diversity_scatter") || delete c[d];
        a._dataManager.getData(b.newValue, c, function(c, d) {
            a._chartManager.updateCharts(b.newValue,
                d, [c])
        });
        a._chartManager.onChartPropogateIcicleLocationChanges().isFiring() || a._chartManager.onChartIcicleLocationChanges().notify()
    }))
};
epiviz.EpiViz.prototype._registerChartPropogateIcicleLocationChange = function() { var a = this;
    a._chartManager.onChartPropogateIcicleLocationChanges().addListener(new epiviz.events.EventListener(function(b) { var c = a._locationManager.currentLocation();
        null != c && a._locationManager.changeCurrentLocation(new epiviz.datatypes.GenomicRange(c.seqName(), b.start, b.width)) })) };
epiviz.localstorage = {};
epiviz.localstorage.LocalStorageManager = function(a) { this._workspace = a;
    this._availStorage = "undefined" === typeof Storage || null == localStorage ? !1 : !0 };
epiviz.localstorage.LocalStorageManager.MODE = { INCOGNITO_MODE: "incognito_workspace", COOKIE_MODE: "workspace" };
epiviz.localstorage.LocalStorageManager.prototype.initialize = function() {};
epiviz.localstorage.LocalStorageManager.prototype.getWorkspace = function(a, b) { if (this._availStorage) { var c = localStorage.getItem(this._workspace); return c ? epiviz.workspaces.Workspace.fromRawObject(JSON.parse(c), a, b) : null } };
epiviz.localstorage.LocalStorageManager.prototype.saveWorkspace = function(a, b) { if (this._availStorage) { var c = a.raw(b);
        localStorage.setItem(this._workspace, JSON.stringify(c)) } };
epiviz.localstorage.LocalStorageManager.prototype.clearWorkspace = function() { this._availStorage && localStorage.removeItem(this._workspace) };
epiviz.localstorage.LocalStorageManager.prototype.clearAll = function() { this._availStorage && localStorage.clear() };
epiviz.ui.LocationManager = function(a) { this._seqInfos = {};
    this._timeout = this._lastUnfilledRequest = this._currentLocation = null;
    this._navigationDelay = a.navigationDelay;
    this._currentLocationChanged = new epiviz.events.Event;
    this._seqInfosUpdated = new epiviz.events.Event;
    this._requestSeqInfos = new epiviz.events.Event };
epiviz.ui.LocationManager.prototype.initialize = function() { this._requestSeqInfos.notify() };
epiviz.ui.LocationManager.prototype.changeCurrentLocation = function(a) { if (!this._currentLocationChanged.isFiring()) { this._lastUnfilledRequest = a;
        null !== this._timeout && (window.clearTimeout(this._timeout), this._timeout = null); var b = this;
        a = function() { var a = b._lastUnfilledRequest;
            null !== a && b._doChangeCurrentLocation(a) };
        this._navigationDelay ? this._timeout = window.setTimeout(a, this._navigationDelay) : a() } };
epiviz.ui.LocationManager.prototype._doChangeCurrentLocation = function(a) {
    var b = this._currentLocation,
        c = a.seqName();
    if (!(a.seqName() in this._seqInfos)) { if (!b) return;
        c = b.seqName() }
    var d = void 0,
        e = void 0;
    this._seqInfos[c] && void 0 != this._seqInfos[c].min && void 0 != this._seqInfos[c].max && (d = void 0 != a.start() && a.start() >= this._seqInfos[c].min ? a.start() : this._seqInfos[c].min, e = void 0 != a.width() ? d + a.width() : d + 9999);
    void 0 != d && void 0 != e && e > this._seqInfos[c].max && (d = Math.max(this._seqInfos[c].min, this._seqInfos[c].max -
        e + d), e = this._seqInfos[c].max);
    this._lastUnfilledRequest = null;
    this._currentLocation = epiviz.datatypes.GenomicRange.fromStartEnd(c, d, e);
    this._currentLocationChanged.notify({ oldValue: b, newValue: this._currentLocation })
};
epiviz.ui.LocationManager.prototype.currentLocation = function() { return this._currentLocation };
epiviz.ui.LocationManager.prototype.lastUnfilledLocationChangeRequest = function() { return this._lastUnfilledRequest };
epiviz.ui.LocationManager.prototype.updateSeqInfos = function(a) { this._seqInfos = {}; for (var b = 0; b < a.length; ++b) this._seqInfos[a[b].seqName] = a[b];
    this._seqInfosUpdated.notify(a);
    null !== this._lastUnfilledRequest && (this._lastUnfilledRequest.seqName() in this._seqInfos ? this._doChangeCurrentLocation(this._lastUnfilledRequest) : 0 < a.length && (a = new epiviz.datatypes.GenomicRange(a[0].seqName, this._lastUnfilledRequest.start(), this._lastUnfilledRequest.width()), this._doChangeCurrentLocation(a))) };
epiviz.ui.LocationManager.prototype.addSeqInfos = function(a) { for (var b = 0; b < a.length; ++b) this._seqInfos[a[b].seqName] || (this._seqInfos[a[b].seqName] = a[b]);
    a = []; for (var c in this._seqInfos) this._seqInfos.hasOwnProperty(c) && a.push(this._seqInfos[c]);
    this._seqInfosUpdated.notify(a) };
epiviz.ui.LocationManager.prototype.removeSeqNames = function(a) { for (var b = 0; b < a.length; ++b) delete this._seqInfos[a[b]];
    a = []; for (var c in this._seqInfos) this._seqInfos.hasOwnProperty(c) && a.push(this._seqInfos[c]);
    this._seqInfosUpdated.notify(a);
    this._currentLocation.seqName() in this._seqInfos || this.changeCurrentLocation(new epiviz.datatypes.GenomicRange(a[0].seqName, this._currentLocation.start(), this._currentLocation.width())) };
epiviz.ui.LocationManager.prototype.seqInfos = function() { return this._seqInfos };
epiviz.ui.LocationManager.prototype.onCurrentLocationChanged = function() { return this._currentLocationChanged };
epiviz.ui.LocationManager.prototype.onSeqInfosUpdated = function() { return this._seqInfosUpdated };
epiviz.ui.LocationManager.prototype.onRequestSeqInfos = function() { return this._requestSeqInfos };
epiviz.measurements.MeasurementsManager = function() { this._requestMeasurements = new epiviz.events.Event;
    this._measurementsAdded = new epiviz.events.Event;
    this._measurementsRemoved = new epiviz.events.Event;
    this._computedMeasurementsAdded = new epiviz.events.Event;
    this._computedMeasurementsRemoved = new epiviz.events.Event;
    this._measurements = new epiviz.measurements.MeasurementSet;
    this._computedMeasurements = new epiviz.measurements.MeasurementSet };
epiviz.measurements.MeasurementsManager.prototype.initialize = function() { this._requestMeasurements.notify() };
epiviz.measurements.MeasurementsManager.prototype.onRequestMeasurements = function() { return this._requestMeasurements };
epiviz.measurements.MeasurementsManager.prototype.onMeasurementsAdded = function() { return this._measurementsAdded };
epiviz.measurements.MeasurementsManager.prototype.onMeasurementsRemoved = function() { return this._measurementsRemoved };
epiviz.measurements.MeasurementsManager.prototype.onComputedMeasurementsAdded = function() { return this._computedMeasurementsAdded };
epiviz.measurements.MeasurementsManager.prototype.onComputedMeasurementsRemoved = function() { return this._computedMeasurementsRemoved };
epiviz.measurements.MeasurementsManager.prototype.measurements = function() { return this._measurements };
epiviz.measurements.MeasurementsManager.prototype.computedMeasurements = function() { return this._computedMeasurements };
epiviz.measurements.MeasurementsManager.prototype.addMeasurements = function(a) { if (a && a.size()) { var b = this;
        this._measurements.addAll(a); var c = new epiviz.measurements.MeasurementSet;
        a.foreach(function(a) { a.isComputed() && (c.add(a), b._computedMeasurements.add(a)) });
        this._measurementsAdded.notify(a);
        0 < c.size() && this._computedMeasurementsAdded.notify(c) } };
epiviz.measurements.MeasurementsManager.prototype.removeMeasurements = function(a) { var b = this;
    this._measurements.removeAll(a); var c = new epiviz.measurements.MeasurementSet;
    a.foreach(function(a) { a.isComputed() && (c.add(a), b._computedMeasurements.remove(a)) });
    this._measurementsRemoved.notify(a);
    0 < c.size() && this._computedMeasurementsRemoved.notify(c) };
epiviz.measurements.MeasurementsManager.prototype.addMeasurement = function(a) { var b = new epiviz.measurements.MeasurementSet;
    b.add(a);
    this.addMeasurements(b) };
epiviz.measurements.MeasurementsManager.prototype.removeMeasurement = function(a) { var b = new epiviz.measurements.MeasurementSet;
    b.add(a);
    this.removeMeasurements(b) };
epiviz.ui.charts.markers.MeasurementAggregator = function(a, b) { this._id = a;
    this._aggregator = b };
epiviz.ui.charts.markers.MeasurementAggregator.prototype.aggregate = function(a, b, c) { return this._aggregator(a, b, c) };
epiviz.ui.charts.markers.MeasurementAggregator.prototype.id = function() { return this._id };
epiviz.ui.charts.markers.MeasurementAggregators = {
    "mean-stdev": new epiviz.ui.charts.markers.MeasurementAggregator("mean-stdev", function(a, b, c) { if (!c || 0 == c.length) return null; var d = c.reduce(function(a, b) { return a + b }) / c.length;
        a = c.map(function(a) { return (a - d) * (a - d) }).reduce(function(a, b) { return a + b }) / c.length;
        a = Math.sqrt(a); return { value: d, errMinus: d - a, errPlus: d + a } }),
    quartiles: new epiviz.ui.charts.markers.MeasurementAggregator("quartiles", function(a, b, c) {
        if (!c || 0 == c.length) return null;
        c = c.slice(0).sort(function(a,
            b) { return a - b });
        a = c.length;
        b = Math.floor(.5 * a);
        var d = Math.ceil(.5 * a);
        return { value: .5 * (c[Math.floor(.5 * (a - 1))] + c[b]), errMinus: .5 * (c[Math.floor(.5 * (b - 1))] + c[Math.floor(.5 * b)]), errPlus: .5 * (c[d + Math.floor(.5 * (a - d - 1))] + c[d + Math.floor(.5 * (a - d))]) }
    }),
    count: new epiviz.ui.charts.markers.MeasurementAggregator("count", function(a, b, c) { return c && 0 != c.length ? { value: c.length } : 0 }),
    min: new epiviz.ui.charts.markers.MeasurementAggregator("min", function(a, b, c) { return c && 0 != c.length ? { value: Math.min.apply(void 0, c) } : null }),
    max: new epiviz.ui.charts.markers.MeasurementAggregator("max", function(a, b, c) { return c && 0 != c.length ? { value: Math.max.apply(void 0, c) } : null }),
    sum: new epiviz.ui.charts.markers.MeasurementAggregator("sum", function(a, b, c) { return c && 0 != c.length ? { value: c.reduce(function(a, b) { return a + b }) } : null })
};
epiviz.ui.charts.ChartType = function(a) { epiviz.ui.charts.VisualizationType.call(this, a) };
epiviz.ui.charts.ChartType.prototype = epiviz.utils.mapCopy(epiviz.ui.charts.VisualizationType.prototype);
epiviz.ui.charts.ChartType.constructor = epiviz.ui.charts.ChartType;
epiviz.ui.charts.ChartType.prototype.createNew = function(a, b, c) { throw Error("unimplemented abstract method"); };
epiviz.ui.charts.ChartType.prototype.customSettingsDefs = function() { var a = epiviz.ui.charts.VisualizationType.prototype.customSettingsDefs.call(this); if (this.isRestrictedToRangeMeasurements()) return a; var b = Object.keys(epiviz.ui.charts.markers.MeasurementAggregators); return a.concat([new epiviz.ui.charts.CustomSetting(epiviz.ui.charts.ChartType.CustomSettings.MEASUREMENT_GROUPS_AGGREGATOR, epiviz.ui.charts.CustomSetting.Type.CATEGORICAL, b[0], "Aggregator for measurement groups", b)]) };
epiviz.ui.charts.ChartType.CustomSettings = { MEASUREMENT_GROUPS_AGGREGATOR: "measurementGroupsAggregator" };
epiviz.ui.charts.Chart = function(a, b, c) { epiviz.ui.charts.Visualization.call(this, a, b, c);
    this._nBins = 100;
    this._globalIndexColorLabels = this._measurementColorLabels = this._binSize = null };
epiviz.ui.charts.Chart.prototype = epiviz.utils.mapCopy(epiviz.ui.charts.Visualization.prototype);
epiviz.ui.charts.Chart.constructor = epiviz.ui.charts.Chart;
epiviz.ui.charts.Chart.prototype._initialize = function() { epiviz.ui.charts.Visualization.prototype._initialize.call(this);
    this._svg.classed("base-chart", !0) };
epiviz.ui.charts.Chart.prototype._addFilters = function() {
    var a = this._svg.append("defs"),
        b = a.append("filter").attr("id", this.id() + "-glow");
    b.append("feGaussianBlur").attr("id", "gaussianBlur").attr("stdDeviation", "2").attr("result", "blurResult");
    b.append("feComposite").attr("id", "composite").attr("in", "SourceGraphic").attr("in2", "blurResult").attr("operator", "over");
    b = a.append("filter").attr("id", this.id() + "-contour");
    b.append("feGaussianBlur").attr("in", "SourceAlpha").attr("stdDeviation", "1").attr("result",
        "blur");
    b.append("feColorMatrix").attr("values", "1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 10 -1 ").attr("result", "colorMatrix");
    b.append("feFlood").attr("result", "fillColor").attr("flood-color", "#800000").attr("in", "blur");
    b.append("feComposite").attr("result", "composite").attr("in", "fillColor").attr("in2", "colorMatrix").attr("operator", "atop");
    b.append("feComposite").attr("in", "SourceGraphic").attr("in2", "composite").attr("operator", "atop");
    a = a.append("filter").attr("id", this.id() + "-dropshadow").attr("filterUnits",
        "userSpaceOnUse").attr("color-interpolation-filters", "sRGB");
    b = a.append("feComponentTransfer").attr("in", "SourceAlpha");
    b.append("feFuncR").attr("type", "discrete").attr("tableValues", "1");
    b.append("feFuncG").attr("type", "discrete").attr("tableValues", 198 / 255);
    b.append("feFuncB").attr("type", "discrete").attr("tableValues", "0");
    a.append("feGaussianBlur").attr("stdDeviation", "2");
    a.append("feOffset").attr("dx", "0").attr("dy", "0").attr("result", "shadow");
    a.append("feComposite").attr("in", "SourceGraphic").attr("in2",
        "shadow").attr("operator", "over")
};
epiviz.ui.charts.Chart.prototype. = function(a, b) { epiviz.ui.charts.Visualization.prototype..call(this, a, b);
    a && (this._binSize = Math.ceil((a.end() - a.start()) / this._nBins)); return [] };
epiviz.ui.charts.Chart.prototype.transformData = function(a, b) {
    var c = new epiviz.deferred.Deferred,
        d = this;
    epiviz.ui.charts.Visualization.prototype.transformData.call(this, a, b).done(function() {
        d._lastData ? d._lastData.ready(function() {
                var a = !1;
                d._lastData.measurements().every(function(b) { a = b.type() !== epiviz.measurements.Measurement.Type.RANGE; return !a });
                if (a) {
                    var b;
                    d._markers.every(function(a) { a && a.type() == epiviz.ui.charts.markers.VisualizationMarker.Type.GROUP_BY_MEASUREMENTS && (b = a); return !b });
                    if (b) {
                        var g =
                            epiviz.ui.charts.markers.MeasurementAggregators[d.customSettingsValues()[epiviz.ui.charts.ChartType.CustomSettings.MEASUREMENT_GROUPS_AGGREGATOR]];
                        d._lastData = new epiviz.datatypes.MeasurementAggregatedGenomicData(d._lastData, b, g)
                    }
                }
                var h;
                d._markers.every(function(a) { a && a.type() == epiviz.ui.charts.markers.VisualizationMarker.Type.FILTER && (h = a); return !h });
                h && (d._lastData = new epiviz.datatypes.ItemFilteredGenomicData(d._lastData, h));
                var m;
                d._markers.every(function(a) {
                    a && a.type() == epiviz.ui.charts.markers.VisualizationMarker.Type.ORDER_BY_MEASUREMENTS &&
                        (m = a);
                    return !m
                });
                m && (d._lastData = new epiviz.datatypes.MeasurementOrderedGenomicData(d._lastData, m));
                d._lastData.ready(function() {
                    var a = d._lastData;
                    if (a.isReady()) {
                        var b = new epiviz.deferred.Deferred,
                            e;
                        d._markers.every(function(a) { a && a.type() == epiviz.ui.charts.markers.VisualizationMarker.Type.COLOR_BY_MEASUREMENTS && (e = a); return !e });
                        d._measurementColorLabels = null;
                        if (e) {
                            var f = new epiviz.measurements.MeasurementHashtable;
                            e.preMark()(a).done(function(c) {
                                var g = a.measurements();
                                epiviz.utils.deferredFor(g.length,
                                    function(b) { var d = new epiviz.deferred.Deferred;
                                        e.mark()(g[b], a, c).done(function(a) { f.put(g[b], a);
                                            d.resolve() }); return d }).done(function() { d._measurementColorLabels = f;
                                    b.resolve() })
                            })
                        } else b.resolve();
                        var g = new epiviz.deferred.Deferred,
                            h;
                        d._markers.every(function(a) { a && a.type() == epiviz.ui.charts.markers.VisualizationMarker.Type.COLOR_BY_ROW && (h = a); return !h });
                        d._globalIndexColorLabels = null;
                        if (h) {
                            var m = {};
                            h.preMark()(a).done(function(b) {
                                var c = a.firstSeries();
                                epiviz.utils.deferredFor(c.size(), function(d) {
                                    var e =
                                        new epiviz.deferred.Deferred;
                                    h.mark()(c.getRow(d), a, b).done(function(a) { m[d + c.globalStartIndex()] = a;
                                        e.resolve() });
                                    return e
                                }).done(function() { d._globalIndexColorLabels = m;
                                    g.resolve() })
                            })
                        } else g.resolve();
                        b.done(function() { g.state() == epiviz.deferred.Deferred.State.RESOLVED && (d._dataWaitEnd.notify(new epiviz.ui.charts.VisEventArgs(d.id())), c.resolve()) });
                        g.done(function() { b.state() == epiviz.deferred.Deferred.State.RESOLVED && (d._dataWaitEnd.notify(new epiviz.ui.charts.VisEventArgs(d.id())), c.resolve()) })
                    }
                })
            }) :
            c.resolve()
    });
    return c
};
epiviz.ui.charts.Chart.prototype.properties = function() { return epiviz.ui.charts.Visualization.prototype.properties.call(this) };
epiviz.ui.charts.VisObject = function() {};
epiviz.ui.charts.VisObject.prototype.regionStart = function() { return null };
epiviz.ui.charts.VisObject.prototype.regionEnd = function() { return null };
epiviz.ui.charts.VisObject.prototype.getMetadata = function(a, b, c) { return null };
epiviz.ui.charts.VisObject.prototype.getStart = function(a, b) { return null };
epiviz.ui.charts.VisObject.prototype.getEnd = function(a, b) { return null };
epiviz.ui.charts.VisObject.prototype.metadataColumns = function() { return null };
epiviz.ui.charts.VisObject.prototype.dimensions = function() { return [0, 0] };
epiviz.ui.charts.VisObject.prototype.metadataLooseCompare = function() { return !1 };
epiviz.ui.charts.VisObject.prototype.overlapsWith = function(a) {
    if (!a) return !1;
    if (this === a) return !0;
    var b, c, d, e = this.dimensions(),
        f = a.dimensions();
    if (!(e[0] && f[0] || void 0 != this.regionStart() && void 0 != a.regionStart() && void 0 != this.regionEnd() && void 0 != a.regionEnd())) return !1;
    if (!e[0]) { if (!f[0]) return this.regionStart() < a.regionEnd() && this.regionEnd() > a.regionStart(); for (c = 0; c < f[1]; ++c)
            if (b = a.getStart(0, c), d = a.getEnd(0, c), void 0 != b && void 0 != d && this.regionStart() < d && this.regionEnd() > b) return !0;
        return !1 }
    var g =
        epiviz.utils.arrayIntersection(this.metadataColumns(), a.metadataColumns());
    if (g.length) { for (b = 0; b < e[1]; ++b)
            for (c = 0; c < f[1]; ++c) { var h = !0; for (d = 0; d < g.length; ++d) { var m = this.metadataLooseCompare() || a.metadataLooseCompare(),
                        l = this.getMetadata(0, b, g[d]),
                        n = a.getMetadata(0, c, g[d]); if (l != n) { if (!m) { h = !1; break }
                        l.length <= n.length ? (m = l, l = n) : m = n; if (!(new RegExp("^(.+,)?" + m + "(,.+)?$")).test(l)) { h = !1; break } } } if (h) return !0 }
        return !1 }
    for (b = 0; b < e[1]; ++b)
        for (c = 0; c < f[1]; ++c)
            if (this.getStart(0, b) < a.getEnd(0, c) && this.getEnd(0,
                    b) > a.getStart(0, c)) return !0;
    return !1
};
epiviz.ui.charts.ChartObject = function(a, b, c, d, e, f, g, h) { epiviz.ui.charts.VisObject.call(this);
    this.id = a;
    this.start = b;
    this.end = c;
    this.values = d;
    this.seriesIndex = e;
    this.valueItems = f;
    this.measurements = g;
    this.cssClasses = h };
epiviz.ui.charts.ChartObject.prototype = epiviz.utils.mapCopy(epiviz.ui.charts.VisObject.prototype);
epiviz.ui.charts.ChartObject.constructor = epiviz.ui.charts.ChartObject;
epiviz.ui.charts.ChartObject.prototype.regionStart = function() { return this.start };
epiviz.ui.charts.ChartObject.prototype.regionEnd = function() { return this.end };
epiviz.ui.charts.ChartObject.prototype.getMetadata = function(a, b, c) { return this.valueItems ? this.valueItems[a][b].rowItem.metadata(c) : null };
epiviz.ui.charts.ChartObject.prototype.getStart = function(a, b) { return this.valueItems[a][b].rowItem.start() };
epiviz.ui.charts.ChartObject.prototype.getEnd = function(a, b) { return this.valueItems[a][b].rowItem.end() };
epiviz.ui.charts.ChartObject.prototype.metadataColumns = function() { return Object.keys(this.valueItems[0][0].rowItem.rowMetadata()) };
epiviz.ui.charts.ChartObject.prototype.dimensions = function() { var a = []; return this.valueItems ? (a.push(this.valueItems.length), this.valueItems.length ? a.push(this.valueItems[0].length) : a.push(0), a) : [0, 0] };
epiviz.ui.charts.Track = function(a, b, c) { epiviz.ui.charts.Chart.call(this, a, b, c);
    this._highlightGroup = this._background = null };
epiviz.ui.charts.Track.prototype = epiviz.utils.mapCopy(epiviz.ui.charts.Chart.prototype);
epiviz.ui.charts.Track.constructor = epiviz.ui.charts.Track;
epiviz.ui.charts.Track.prototype._initialize = function() {
    this._properties.width = "100%";
    epiviz.ui.charts.Chart.prototype._initialize.call(this);
    var a = this;
    this._highlightGroup = this._svg.append("g").attr("class", "track-highlight");
    this._background = this._svg.append("rect").attr("class", "chart-background").attr("x", 0).attr("y", 0).attr("width", "100%").attr("height", "100%").attr("fill", "#ffffff").attr("fill-opacity", "0");
    this._background.on("mouseover", function() { a._captureMouseHover() }).on("mousemove",
        function() { a._captureMouseHover() }).on("mouseout", function() { a._unhover.notify(new epiviz.ui.charts.VisEventArgs(a.id())) })
};
epiviz.ui.charts.Track.prototype. = function(a, b, c, d) { a = epiviz.ui.charts.Chart.prototype..call(this, a, b);
    this._Legend(); return a };
epiviz.ui.charts.Track.prototype.displayType = function() { return epiviz.ui.charts.VisualizationType.DisplayType.TRACK };
epiviz.ui.charts.Track.prototype.doHover = function(a) {
    epiviz.ui.charts.Chart.prototype.doHover.call(this, a);
    if (void 0 != a.start && void 0 != a.end && this._lastRange) {
        this._highlightGroup.selectAll("rect").remove();
        this._highlightGroup.attr("transform", "translate(" + this.margins().left() + ", 0)");
        var b = epiviz.ui.charts.Axis,
            c = d3.scale.linear().domain([this._lastRange.start(), this._lastRange.end()]).range([0, this.width() - this.margins().sumAxis(b.X)]),
            b = [];
        if (a.measurements && a.measurements.length)
            for (var d = 0; d <
                a.valueItems[0].length; ++d) { var e = a.valueItems[0][d].rowItem;
                b.push({ start: e.start(), end: e.end() }) } else b.push({ start: a.start, end: a.end });
        this._highlightGroup.selectAll("rect").data(b, function(a) { return sprintf("%s-%s", a.start, a.end) }).enter().append("rect").style("fill", this.colors().get(0)).style("fill-opacity", "0.1").attr("x", function(a) { var b = c(a.end + 1) - c(a.start),
                d = Math.max(5, b); return c(a.start) + .5 * b - .5 * d }).attr("width", function(a) { return Math.max(5, c(a.end + 1) - c(a.start)) }).attr("y", 0).attr("height",
            this.height())
    }
};
epiviz.ui.charts.Track.prototype.doUnhover = function() { epiviz.ui.charts.Chart.prototype.doUnhover.call(this);
    this._highlightGroup.selectAll("rect").remove() };
epiviz.ui.charts.Track.prototype._captureMouseHover = function() { if (this._lastRange) { this._unhover.notify(new epiviz.ui.charts.VisEventArgs(this.id())); var a = d3.scale.linear().domain([0, this.width()]).range([this._lastRange.start(), this._lastRange.end()])(d3.mouse(this._background[0][0])[0]) - this._binSize / 2,
            b = a + this._binSize,
            a = new epiviz.ui.charts.ChartObject(sprintf("%s-highlight", this.id()), a, b);
        this._hover.notify(new epiviz.ui.charts.VisEventArgs(this.id(), a)) } };
epiviz.ui.charts.Track.prototype._Legend = function() {
    var a = this;
    this._svg.selectAll(".chart-title").remove();
    this._svg.selectAll(".chart-title-color ").remove();
    if (this._lastData && this._lastData.isReady()) {
        var b = this._lastData.measurements(),
            c = this._svg.selectAll(".chart-title").data(b).enter().append("text").attr("class", "chart-title").attr("font-weight", "bold").attr("fill", function(b, c) { return a._measurementColorLabels ? a.colors().getByKey(a._measurementColorLabels.get(b)) : a.colors().get(c) }).attr("y",
                a.margins().top() - 5).text(function(a, b) { return a.name() }),
            d = 0,
            e = [];
        $("#" + this.id() + " .chart-title").each(function(a) { e.push(d);
            d += this.getBBox().width + 15 });
        c.attr("x", function(b, c) { return a.margins().left() + 10 + e[c] });
        this._svg.selectAll(".chart-title-color").data(b).enter().append("circle").attr("class", "chart-title-color").attr("cx", function(b, c) { return a.margins().left() + 4 + e[c] }).attr("cy", a.margins().top() - 9).attr("r", 4).style("shape-rendering", "auto").style("stroke-width", "0").style("fill", function(b,
            c) { return a._measurementColorLabels ? a.colors().getByKey(a._measurementColorLabels.get(b)) : a.colors().get(c) })
    }
};
epiviz.plugins = {};
epiviz.plugins.charts = {};
epiviz.plugins.charts.BlocksTrack = function(a, b, c) { epiviz.ui.charts.Track.call(this, a, b, c);
    this._initialize() };
epiviz.plugins.charts.BlocksTrack.prototype = epiviz.utils.mapCopy(epiviz.ui.charts.Track.prototype);
epiviz.plugins.charts.BlocksTrack.constructor = epiviz.plugins.charts.BlocksTrack;
epiviz.plugins.charts.BlocksTrack.prototype._initialize = function() { epiviz.ui.charts.Track.prototype._initialize.call(this);
    this._svg.classed("blocks-track", !0) };
epiviz.plugins.charts.BlocksTrack.prototype. = function(a, b, c, d) { epiviz.ui.charts.Track.prototype..call(this, a, b, c, d);
    b = this._lastData;
    a = this._lastRange; return b && a && b.isReady() ? this._Blocks(a, b, c || 0, d || 1) : [] };
epiviz.plugins.charts.BlocksTrack.prototype._Blocks = function(a, b, c, d) {
    var e = epiviz.ui.charts.Axis,
        f = a.start(),
        g = a.end(),
        h = this.width(),
        m = this.height(),
        l = this.margins();
    this.measurements();
    var n = this.colors(),
        p = this.customSettingsValues()[epiviz.plugins.charts.BlocksTrackType.CustomSettings.MIN_BLOCK_DISTANCE],
        t = this.customSettingsValues()[epiviz.plugins.charts.BlocksTrackType.CustomSettings.BLOCK_COLOR_BY],
        r = this.customSettingsValues()[epiviz.plugins.charts.BlocksTrackType.CustomSettings.USE_COLOR_BY],
        q = d3.scale.linear().domain([f, g]).range([0, h - l.sumAxis(e.X)]),
        u = c * (h - l.sumAxis(e.X)) / (g - f);
    this._clearAxes();
    this._Axes(q, null, 10, 5);
    var w = this,
        v = [],
        z = 0;
    b.foreach(function(b, c, d) {
        d = [];
        for (var e = 0; e < c.size(); ++e) {
            var f = c.get(e);
            if (!(f.rowItem.start() > a.end() || f.rowItem.end() < a.start())) {
                var g = sprintf("item data-series-%s", z);
                if (null !== p && 0 < d.length) {
                    var h = d[d.length - 1],
                        l = q(f.rowItem.start()),
                        m = q(h.end);
                    if (l - m < p) {
                        h.end = Math.max(h.end, f.rowItem.end());
                        h.valueItems[0].push(f);
                        h.id = sprintf("b-%s-%s-%s",
                            z, h.start, h.end);
                        continue
                    }
                }
                d.push(new epiviz.ui.charts.ChartObject(sprintf("b-%s-%s-%s", z, f.rowItem.start(), f.rowItem.end()), f.rowItem.start(), f.rowItem.end(), f.rowItem.metadata(t), z, [
                    [f]
                ], [b], g))
            }
        }
        v = v.concat(d);
        ++z
    });
    c = this._svg.select(".items");
    f = c.select(".selected");
    f = this._svg.select("#clip-" + this.id());
    c.empty() && (f.empty() && this._svg.select("defs").append("clipPath").attr("id", "clip-" + this.id()).append("rect").attr("class", "clip-path-rect"), c = this._svg.append("g").attr("class", "items").attr("id",
        this.id() + "-gene-content").attr("clip-path", "url(#clip-" + this.id() + ")"), f = c.append("g").attr("class", "selected"), c.append("g").attr("class", "hovered"), f.append("g").attr("class", "hovered"));
    c.attr("transform", "translate(" + l.left() + ", " + l.top() + ")");
    this._svg.select(".clip-path-rect").attr("x", 0).attr("y", 0).attr("width", h - l.sumAxis(e.X)).attr("height", m - l.sumAxis(e.Y));
    c.selectAll(".item").remove();
    h = c.selectAll(".item").data(v, function(a) { return a.id });
    h.enter().insert("rect", ":first-child").attr("class",
        function(a) { return a.cssClasses }).style("fill", function(a) { a = 1 < b.measurements().length ? n.get(a.seriesIndex) : r ? n.getByKey(a.values) : n.get(a.seriesIndex); return a }).attr("x", function(a) { return q(a.start) / d + u }).attr("width", function(a) { return d * (q(a.end + 1) - q(a.start)) }).on("mouseout", function() { w._unhover.notify(new epiviz.ui.charts.VisEventArgs(w.id())) }).on("mouseover", function(a) { w._hover.notify(new epiviz.ui.charts.VisEventArgs(w.id(), a)) }).on("click", function(a) {
        w._deselect.notify(new epiviz.ui.charts.VisEventArgs(w.id()));
        w._select.notify(new epiviz.ui.charts.VisEventArgs(w.id(), a));
        d3.event.stopPropagation()
    });
    h.attr("class", function(a) { return a.cssClasses }).attr("height", m - l.sumAxis(e.Y)).attr("y", 0).transition().duration(500).attr("x", function(a) { return q(a.start) }).attr("width", function(a) { return q(a.end + 1) - q(a.start) });
    h.exit().transition().duration(500).attr("x", function(a) { return q(a.start) }).remove();
    return v
};
epiviz.plugins.charts.BlocksTrack.prototype.setColors = function(a) { this.container().find(".items").remove();
    epiviz.ui.charts.Visualization.prototype.setColors.call(this, a) };
epiviz.ui.charts.TrackType = function(a) { epiviz.ui.charts.ChartType.call(this, a) };
epiviz.ui.charts.TrackType.prototype = epiviz.utils.mapCopy(epiviz.ui.charts.ChartType.prototype);
epiviz.ui.charts.TrackType.constructor = epiviz.ui.charts.TrackType;
epiviz.ui.charts.TrackType.prototype.chartDisplayType = function() { return epiviz.ui.charts.VisualizationType.DisplayType.TRACK };
epiviz.ui.charts.TrackType.prototype.cssClass = function() { return "track-container ui-widget-content" };
epiviz.plugins.charts.BlocksTrackType = function(a) { epiviz.ui.charts.TrackType.call(this, a) };
epiviz.plugins.charts.BlocksTrackType.prototype = epiviz.utils.mapCopy(epiviz.ui.charts.TrackType.prototype);
epiviz.plugins.charts.BlocksTrackType.constructor = epiviz.plugins.charts.BlocksTrackType;
epiviz.plugins.charts.BlocksTrackType.prototype.createNew = function(a, b, c) { return new epiviz.plugins.charts.BlocksTrack(a, b, c) };
epiviz.plugins.charts.BlocksTrackType.prototype.typeName = function() { return "epiviz.plugins.charts.BlocksTrack" };
epiviz.plugins.charts.BlocksTrackType.prototype.chartName = function() { return "Blocks Track" };
epiviz.plugins.charts.BlocksTrackType.prototype.chartHtmlAttributeName = function() { return "blocks" };
epiviz.plugins.charts.BlocksTrackType.prototype.isRestrictedToRangeMeasurements = function() { return !0 };
epiviz.plugins.charts.BlocksTrackType.prototype.measurementsFilter = function() { return function(a) { return a.type() == epiviz.measurements.Measurement.Type.RANGE } };
epiviz.plugins.charts.BlocksTrackType.prototype.customSettingsDefs = function() {
    return epiviz.ui.charts.TrackType.prototype.customSettingsDefs.call(this).concat([new epiviz.ui.charts.CustomSetting(epiviz.plugins.charts.BlocksTrackType.CustomSettings.MIN_BLOCK_DISTANCE, epiviz.ui.charts.CustomSetting.Type.NUMBER, 5, "Minimum block distance"), new epiviz.ui.charts.CustomSetting(epiviz.plugins.charts.BlocksTrackType.CustomSettings.USE_COLOR_BY, epiviz.ui.charts.CustomSetting.Type.BOOLEAN, !1, "Use Block Color by"),
        new epiviz.ui.charts.CustomSetting(epiviz.plugins.charts.BlocksTrackType.CustomSettings.BLOCK_COLOR_BY, epiviz.ui.charts.CustomSetting.Type.MEASUREMENTS_METADATA, "colLabel", "Block color by")
    ])
};
epiviz.plugins.charts.BlocksTrackType.CustomSettings = { MIN_BLOCK_DISTANCE: "minBlockDistance", BLOCK_COLOR_BY: "blockColorBy", USE_COLOR_BY: "useColorBy" };
epiviz.plugins.charts.LineTrack = function(a, b, c) { epiviz.ui.charts.Track.call(this, a, b, c);
    this._initialize() };
epiviz.plugins.charts.LineTrack.prototype = epiviz.utils.mapCopy(epiviz.ui.charts.Track.prototype);
epiviz.plugins.charts.LineTrack.constructor = epiviz.plugins.charts.LineTrack;
epiviz.plugins.charts.LineTrack.prototype._initialize = function() { epiviz.ui.charts.Track.prototype._initialize.call(this) };
epiviz.plugins.charts.LineTrack.prototype. = function(a, b, c, d) {
    epiviz.ui.charts.Track.prototype..call(this, a, b, c, d);
    b = this._lastData;
    a = this._lastRange;
    c = c || this._slide || 0;
    d = d || this._zoom || 1;
    this._slide = 0;
    this._zoom = 1;
    if (!b || !a) return [];
    var e = epiviz.ui.charts.CustomSetting,
        f = this.customSettingsValues()[epiviz.ui.charts.Visualization.CustomSettings.Y_MIN],
        g = this.customSettingsValues()[epiviz.ui.charts.Visualization.CustomSettings.Y_MAX];
    f == e.DEFAULT && (f = null, this.measurements().foreach(function(a) {
        null !==
            a && (null === f || a.minValue() < f) && (f = a.minValue())
    }));
    g == e.DEFAULT && (g = null, this.measurements().foreach(function(a) { null !== a && (null === g || a.maxValue() > g) && (g = a.maxValue()) }));
    null === f && null === g && (f = -1, g = 1);
    null === f && (f = g - 1);
    null === g && (g = f + 1);
    var h = epiviz.ui.charts.Axis,
        e = d3.scale.linear().domain([a.start(), a.end()]).range([0, this.width() - this.margins().sumAxis(h.X)]),
        m = d3.scale.linear().domain([f, g]).range([this.height() - this.margins().sumAxis(h.Y), 0]);
    this._clearAxes();
    this._Axes(e, m, 10, 5);
    c = c * (this.width() -
        this.margins().sumAxis(h.X)) / a.width();
    var l = this._svg.selectAll(".lines");
    l.empty() && (l = this._svg.append("g").attr("class", "lines").attr("transform", "translate(" + this.margins().left() + ", " + this.margins().top() + ")"));
    b.measurements().forEach(function(a, b) { var c = l.selectAll(".line-series-index-" + b),
            d = l.selectAll(".point-series-index-" + b);
        c.empty() && l.append("g").attr("class", "line-series-index-" + b);
        d.empty() && l.append("g").attr("class", "point-series-index-" + b) });
    for (h = b.measurements().length;; ++h) {
        var n =
            l.selectAll(".line-series-index-" + h),
            p = l.selectAll(".point-series-index-" + h);
        if (n.empty()) break;
        n.remove();
        p.remove()
    }
    return this._Lines(a, b, c, d, e, m)
};
epiviz.plugins.charts.LineTrack.prototype._Lines = function(a, b, c, d, e, f) {
    var g = this.colors(),
        h = parseInt(this.customSettingsValues()[epiviz.plugins.charts.LineTrackType.CustomSettings.STEP]),
        m = this.customSettingsValues()[epiviz.plugins.charts.LineTrackType.CustomSettings.SHOW_POINTS],
        l = this.customSettingsValues()[epiviz.plugins.charts.LineTrackType.CustomSettings.SHOW_LINES],
        n = this.customSettingsValues()[epiviz.plugins.charts.LineTrackType.CustomSettings.SHOW_ERROR_BARS],
        p = this.customSettingsValues()[epiviz.plugins.charts.LineTrackType.CustomSettings.POINT_RADIUS],
        t = this.customSettingsValues()[epiviz.plugins.charts.LineTrackType.CustomSettings.LINE_THICKNESS],
        r = this.customSettingsValues()[epiviz.plugins.charts.LineTrackType.CustomSettings.INTERPOLATION];
    d = this.customSettingsValues()[epiviz.plugins.charts.LinePlotType.CustomSettings.ABS_LINE_VAL];
    var q = this,
        u = d3.scale.linear().domain([0, this.width() - this.margins().sumAxis(epiviz.ui.charts.Axis.X)]).range([a.start(), a.end()])(c) - a.start(),
        w = epiviz.datatypes.GenomicRange.fromStartEnd(a.seqName(), Math.min(a.start(),
            a.start() + u), Math.max(a.end(), a.end() + u)),
        v = this._svg.select(".lines"),
        z = [];
    b.foreach(function(a, b, d) {
        var A = q._measurementColorLabels ? g.getByKey(q._measurementColorLabels.get(a)) : g.get(d),
            u = b.binarySearchStarts(w);
        if (0 != u.length) {
            var y = Math.ceil(u.index / h) * h;
            u.length = Math.max(0, u.length - y + u.index);
            u.index = y;
            for (var y = epiviz.utils.range(u.length, u.index).filter(function(a) { return !h || 1 >= h || 0 == (a - u.index) % h }), x = 0; x < y.length; ++x) {
                var F = b.get(y[x]);
                z.push(new epiviz.ui.charts.ChartObject(sprintf("line_%s_%s",
                    d, F.globalIndex), F.rowItem.start(), F.rowItem.end(), [F.value], d, [
                    [F]
                ], [a], sprintf("item data-series-%s", d)))
            }
            var D = function(a) { a = b.get(a); return e(a.rowItem.start()) };
            a = function(a) { a = b.get(a); return f(a.value) };
            l ? (x = d3.svg.line().x(D).y(a).interpolate(r), F = v.select(".line-series-index-" + d).selectAll("path").data([y]), F.enter().append("path").attr("d", x).style("shape-rendering", "auto").style("stroke-opacity", "0.8").on("mouseover", function() { q._captureMouseHover() }).on("mousemove", function() { q._captureMouseHover() }).on("mouseout",
                function() { q._unhover.notify(new epiviz.ui.charts.VisEventArgs(q.id())) }), F.attr("d", x).style("stroke", A).style("stroke-width", t).attr("transform", "translate(" + +c + ")").transition().duration(500).attr("transform", "translate(0)")) : v.select(".line-series-index-" + d).selectAll("path").remove();
            v.select(".point-series-index-" + d).selectAll("circle").remove();
            v.select(".point-series-index-" + d).selectAll(".error-bar").remove();
            m && (x = v.select(".point-series-index-" + d).selectAll("circle").data(y), x.enter().append("circle").attr("class",
                "point-series-index-" + d).attr("r", p).attr("cx", D).attr("cy", a).attr("fill", A).attr("stroke", A).attr("transform", "translate(" + +c + ")").transition().duration(500).attr("transform", "translate(0)"), x.on("mouseover", function() { q._captureMouseHover() }).on("mousemove", function() { q._captureMouseHover() }).on("mouseout", function() { q._unhover.notify(new epiviz.ui.charts.VisEventArgs(q.id())) }), x.exit().transition().duration(500).style("opacity", 0).remove(), n && (d = v.select(".point-series-index-" + d).selectAll(".error-bar").data(y),
                d.enter().append("g").attr("class", "error-bar").each(function(a) {
                    var c;
                    c = b.get(a);
                    c = c.valueAnnotation ? c.valueAnnotation.errMinus : null;
                    c = void 0 != c ? f(c) : null;
                    var d;
                    d = b.get(a);
                    d = d.valueAnnotation ? d.valueAnnotation.errPlus : null;
                    d = void 0 != d ? f(d) : null;
                    null != c && null != d && (d3.select(this).append("line").attr("x1", D(a)).attr("x2", D(a)).attr("y1", c).attr("y2", d).style("stroke", A).style("shape-rendering", "auto"), d3.select(this).append("line").attr("x1", D(a) - 2).attr("x2", D(a) + 2).attr("y1", c).attr("y2", c).style("stroke",
                        A).style("shape-rendering", "auto"), d3.select(this).append("line").attr("x1", D(a) - 2).attr("x2", D(a) + 2).attr("y1", d).attr("y2", d).style("stroke", A).style("shape-rendering", "auto"))
                }).attr("transform", "translate(" + +c + ")").transition().duration(500).attr("transform", "translate(0)"), d.on("mouseover", function() { q._captureMouseHover() }).on("mousemove", function() { q._captureMouseHover() }).on("mouseout", function() { q._unhover.notify(new epiviz.ui.charts.VisEventArgs(q.id())) }), d.exit().transition().duration(500).style("opacity",
                    0).remove()))
        }
    });
    d != epiviz.ui.charts.CustomSetting.DEFAULT && (v.selectAll(".abLine").remove(), v.append("svg:line").attr("class", "abLine").attr("x1", 0).attr("x2", q.width() - q.margins().sumAxis(epiviz.ui.charts.Axis.X)).attr("y1", f(d)).attr("y2", f(d)).style("stroke", "black").style("stroke-dasharray", "5, 5"));
    return z
};
epiviz.plugins.charts.LineTrackType = function(a) { epiviz.ui.charts.TrackType.call(this, a) };
epiviz.plugins.charts.LineTrackType.prototype = epiviz.utils.mapCopy(epiviz.ui.charts.TrackType.prototype);
epiviz.plugins.charts.LineTrackType.constructor = epiviz.plugins.charts.LineTrackType;
epiviz.plugins.charts.LineTrackType.prototype.createNew = function(a, b, c) { return new epiviz.plugins.charts.LineTrack(a, b, c) };
epiviz.plugins.charts.LineTrackType.prototype.typeName = function() { return "epiviz.plugins.charts.LineTrack" };
epiviz.plugins.charts.LineTrackType.prototype.chartName = function() { return "Line Track" };
epiviz.plugins.charts.LineTrackType.prototype.chartHtmlAttributeName = function() { return "lines" };
epiviz.plugins.charts.LineTrackType.prototype.measurementsFilter = function() { return function(a) { return a.type() == epiviz.measurements.Measurement.Type.FEATURE } };
epiviz.plugins.charts.LineTrackType.prototype.customSettingsDefs = function() {
    return epiviz.ui.charts.TrackType.prototype.customSettingsDefs.call(this).concat([new epiviz.ui.charts.CustomSetting(epiviz.plugins.charts.LineTrackType.CustomSettings.STEP, epiviz.ui.charts.CustomSetting.Type.NUMBER, 50, "Step"), new epiviz.ui.charts.CustomSetting(epiviz.plugins.charts.LineTrackType.CustomSettings.SHOW_POINTS, epiviz.ui.charts.CustomSetting.Type.BOOLEAN, !1, "Show points"), new epiviz.ui.charts.CustomSetting(epiviz.plugins.charts.LineTrackType.CustomSettings.SHOW_LINES,
        epiviz.ui.charts.CustomSetting.Type.BOOLEAN, !0, "Show lines"), new epiviz.ui.charts.CustomSetting(epiviz.plugins.charts.LineTrackType.CustomSettings.SHOW_ERROR_BARS, epiviz.ui.charts.CustomSetting.Type.BOOLEAN, !0, "Show error bars"), new epiviz.ui.charts.CustomSetting(epiviz.plugins.charts.LineTrackType.CustomSettings.POINT_RADIUS, epiviz.ui.charts.CustomSetting.Type.NUMBER, 1, "Point radius"), new epiviz.ui.charts.CustomSetting(epiviz.plugins.charts.LineTrackType.CustomSettings.LINE_THICKNESS, epiviz.ui.charts.CustomSetting.Type.NUMBER,
        1, "Line thickness"), new epiviz.ui.charts.CustomSetting(epiviz.ui.charts.Visualization.CustomSettings.Y_MIN, epiviz.ui.charts.CustomSetting.Type.NUMBER, epiviz.ui.charts.CustomSetting.DEFAULT, "Min Y"), new epiviz.ui.charts.CustomSetting(epiviz.ui.charts.Visualization.CustomSettings.Y_MAX, epiviz.ui.charts.CustomSetting.Type.NUMBER, epiviz.ui.charts.CustomSetting.DEFAULT, "Max Y"), new epiviz.ui.charts.CustomSetting(epiviz.plugins.charts.LineTrackType.CustomSettings.INTERPOLATION, epiviz.ui.charts.CustomSetting.Type.CATEGORICAL,
        "linear", "Interpolation", "linear step-before step-after basis basis-open basis-closed bundle cardinal cardinal-open monotone".split(" ")), new epiviz.ui.charts.CustomSetting(epiviz.plugins.charts.LineTrackType.CustomSettings.ABS_LINE_VAL, epiviz.ui.charts.CustomSetting.Type.NUMBER, epiviz.ui.charts.CustomSetting.DEFAULT, " abline")])
};
epiviz.plugins.charts.LineTrackType.CustomSettings = { STEP: "step", SHOW_POINTS: "showPoints", SHOW_ERROR_BARS: "showErrorBars", SHOW_LINES: "showLines", POINT_RADIUS: "pointRadius", LINE_THICKNESS: "lineThickness", INTERPOLATION: "interpolation", ABS_LINE_VAL: "abLine" };
epiviz.plugins.charts.StackedLineTrack = function(a, b, c) { epiviz.ui.charts.Track.call(this, a, b, c);
    this._initialize() };
epiviz.plugins.charts.StackedLineTrack.prototype = epiviz.utils.mapCopy(epiviz.ui.charts.Track.prototype);
epiviz.plugins.charts.StackedLineTrack.constructor = epiviz.plugins.charts.StackedLineTrack;
epiviz.plugins.charts.StackedLineTrack.prototype._initialize = function() { epiviz.ui.charts.Track.prototype._initialize.call(this) };
epiviz.plugins.charts.StackedLineTrack.prototype. = function(a, b, c, d) { epiviz.ui.charts.Track.prototype..call(this, a, b, c, d);
    b = this._lastData;
    a = this._lastRange;
    c = c || this._slide;
    d = d || this._zoom;
    this._slide = 0;
    this._zoom = 1; if (!b || !a) return []; var e = epiviz.ui.charts.Axis;
    c = (c || 0) * (this.width() - this.margins().sumAxis(e.X)) / a.width(); return this._Lines(a, b, c, d || 1) };
epiviz.plugins.charts.StackedLineTrack.prototype._Lines = function(a, b, c, d) {
    var e = epiviz.ui.charts.Axis,
        f = this.colors(),
        g = this.customSettingsValues()[epiviz.plugins.charts.StackedLineTrackType.CustomSettings.STEP],
        h = this.customSettingsValues()[epiviz.plugins.charts.StackedLineTrackType.CustomSettings.INTERPOLATION],
        m = this.customSettingsValues()[epiviz.plugins.charts.StackedLineTrackType.CustomSettings.OFFSET];
    d = this.customSettingsValues()[epiviz.plugins.charts.LinePlotType.CustomSettings.ABS_LINE_VAL];
    var l = this,
        n = d3.scale.linear().domain([0, this.width() - this.margins().sumAxis(e.X)]).range([a.start(), a.end()])(c) - a.start();
    epiviz.datatypes.GenomicRange.fromStartEnd(a.seqName(), Math.min(a.start(), a.start() + n), Math.max(a.end(), a.end() + n));
    var p = [],
        t = [],
        r = b.firstSeries().globalStartIndex(),
        q = b.firstSeries().globalEndIndex();
    b.foreach(function(a, b) { var c = b.globalStartIndex(),
            d = b.globalEndIndex();
        c > r && (r = c);
        d < q && (q = d) });
    var r = Math.ceil(r / g) * g,
        q = Math.floor(q / g) * g,
        u;
    b.foreach(function(a, b, c) {
        for (var d =
                epiviz.utils.range((q - r) / g).map(function(a) { return a * g + r }).filter(function(a) { return b.getByGlobalIndex(a) }), e = 0; e < d.length; ++e) { var f = b.getByGlobalIndex(d[e]);
            p.push(new epiviz.ui.charts.ChartObject(sprintf("line_%s_%s", c, f.globalIndex), f.rowItem.start(), f.rowItem.end(), [f.value], c, [
                [f]
            ], [a], sprintf("item data-series-%s", c))) }
        var h = [];
        d.forEach(function(a) { h.push({ x: b.getByGlobalIndex(a).rowItem.start(), y: b.getByGlobalIndex(a).value }) });
        t.push(h);
        u || (u = [], d.forEach(function(a) {
            a = b.getByGlobalIndex(a);
            u.push(a.rowItem.metadata("bacteria"))
        }))
    });
    var w = d3.scale.linear().domain([a.start(), a.end()]).range([0, this.width() - this.margins().sumAxis(e.X)]);
    this._clearAxes();
    this._Axes(w, void 0, 10);
    a = this._svg.select(".lines");
    a.empty() && (a = this._svg.append("g").attr("class", "lines").attr("transform", "translate(" + this.margins().left() + ", " + this.margins().top() + ")"));
    b = d3.layout.stack().offset(m)(t);
    var v = d3.scale.linear().domain([Math.min(0, d3.min(b, function(a) {
            return d3.min(a, function(a) {
                return a.y0 +
                    a.y
            })
        })), d3.max(b, function(a) { return d3.max(a, function(a) { return a.y0 + a.y }) })]).range([this.height() - this.margins().sumAxis(e.Y), 0]),
        e = d3.svg.area().x(function(a) { return w(a.x) }).y0(function(a) { return v(a.y0) }).y1(function(a) { return v(a.y0 + a.y) }).interpolate(h),
        h = a.selectAll("path").data(b);
    h.enter().append("path").attr("d", e).style("shape-rendering", "auto").style("stroke-width", "0").style("fill", function(a, b) { return f.get(b) }).on("mouseover", function() { l._captureMouseHover() }).on("mousemove", function() { l._captureMouseHover() }).on("mouseout",
        function() { l._unhover.notify(new epiviz.ui.charts.VisEventArgs(l.id())) });
    h.attr("d", e).style("fill", function(a, b) { return f.get(b) }).attr("transform", "translate(" + +c + ")").transition().duration(500).attr("transform", "translate(0)");
    d != epiviz.ui.charts.CustomSetting.DEFAULT && (a.selectAll(".abLine").remove(), a.append("svg:line").attr("class", "abLine").attr("x1", 0).attr("x2", l.width() - l.margins().sumAxis(epiviz.ui.charts.Axis.X)).attr("y1", v(d)).attr("y2", v(d)).style("stroke", "black").style("stroke-dasharray",
        "5, 5"));
    return p
};
epiviz.plugins.charts.StackedLineTrackType = function(a) { epiviz.ui.charts.TrackType.call(this, a) };
epiviz.plugins.charts.StackedLineTrackType.prototype = epiviz.utils.mapCopy(epiviz.ui.charts.TrackType.prototype);
epiviz.plugins.charts.StackedLineTrackType.constructor = epiviz.plugins.charts.StackedLineTrackType;
epiviz.plugins.charts.StackedLineTrackType.prototype.createNew = function(a, b, c) { return new epiviz.plugins.charts.StackedLineTrack(a, b, c) };
epiviz.plugins.charts.StackedLineTrackType.prototype.typeName = function() { return "epiviz.plugins.charts.StackedLineTrack" };
epiviz.plugins.charts.StackedLineTrackType.prototype.chartName = function() { return "Stacked Track" };
epiviz.plugins.charts.StackedLineTrackType.prototype.chartHtmlAttributeName = function() { return "stacked-lines" };
epiviz.plugins.charts.StackedLineTrackType.prototype.measurementsFilter = function() { return function(a) { return a.type() == epiviz.measurements.Measurement.Type.FEATURE } };
epiviz.plugins.charts.StackedLineTrackType.prototype.isRestrictedToSameDatasourceGroup = function() { return !0 };
epiviz.plugins.charts.StackedLineTrackType.prototype.customSettingsDefs = function() {
    return epiviz.ui.charts.TrackType.prototype.customSettingsDefs.call(this).concat([new epiviz.ui.charts.CustomSetting(epiviz.plugins.charts.StackedLineTrackType.CustomSettings.STEP, epiviz.ui.charts.CustomSetting.Type.NUMBER, 1, "Step"), new epiviz.ui.charts.CustomSetting(epiviz.plugins.charts.StackedLineTrackType.CustomSettings.OFFSET, epiviz.ui.charts.CustomSetting.Type.CATEGORICAL, "zero", "Offset", ["zero", "wiggle"]), new epiviz.ui.charts.CustomSetting(epiviz.plugins.charts.StackedLineTrackType.CustomSettings.INTERPOLATION,
        epiviz.ui.charts.CustomSetting.Type.CATEGORICAL, "basis", "Interpolation", "linear step-before step-after basis basis-open basis-closed bundle cardinal cardinal-open monotone".split(" ")), new epiviz.ui.charts.CustomSetting(epiviz.plugins.charts.StackedLineTrackType.CustomSettings.ABS_LINE_VAL, epiviz.ui.charts.CustomSetting.Type.NUMBER, epiviz.ui.charts.CustomSetting.DEFAULT, " abline")])
};
epiviz.plugins.charts.StackedLineTrackType.CustomSettings = { STEP: "step", OFFSET: "offset", INTERPOLATION: "interpolation", ABS_LINE_VAL: "abLine" };
epiviz.ui.charts.Plot = function(a, b, c) { epiviz.ui.charts.Chart.call(this, a, b, c) };
epiviz.ui.charts.Plot.prototype = epiviz.utils.mapCopy(epiviz.ui.charts.Chart.prototype);
epiviz.ui.charts.Plot.constructor = epiviz.ui.charts.Plot;
epiviz.ui.charts.Plot.prototype.displayType = function() { return epiviz.ui.charts.VisualizationType.DisplayType.PLOT };
epiviz.plugins.charts.ScatterPlot = function(a, b, c) {
    epiviz.ui.charts.Plot.call(this, a, b, c);
    this._legend = this._chartContent = null;
    this._measurementsX = [];
    this._measurementsY = [];
    var d = this;
    this.measurements().foreach(function(a, b) { 0 == b % 2 ? d._measurementsX.push(a) : d._measurementsY.push(a) });
    this._yLabel = this._xLabel = "";
    for (a = 0; a < Math.min(this._measurementsX.length, this._measurementsY.length); ++a) 0 < a && (this._xLabel += ", ", this._yLabel += ", "), this._xLabel += this._measurementsX[a].name(), this._yLabel += this._measurementsY[a].name();
    this._colorLabels = [];
    this._initialize()
};
epiviz.plugins.charts.ScatterPlot.prototype = epiviz.utils.mapCopy(epiviz.ui.charts.Plot.prototype);
epiviz.plugins.charts.ScatterPlot.constructor = epiviz.plugins.charts.ScatterPlot;
epiviz.plugins.charts.ScatterPlot.prototype._initialize = function() { epiviz.ui.charts.Plot.prototype._initialize.call(this);
    this._svg.classed("scatter-plot", !0);
    this._chartContent = this._svg.append("g").attr("class", "chart-content");
    this._legend = this._svg.append("g").attr("class", "chart-legend") };
epiviz.plugins.charts.ScatterPlot.prototype. = function(a, b) { epiviz.ui.charts.Plot.prototype..call(this, a, b);
    b = this._lastData;
    a = this._lastRange; return b && a ? this._Circles(a, b) : [] };
epiviz.plugins.charts.ScatterPlot.prototype._Circles = function(a, b) {
    var c = this,
        d = epiviz.ui.charts.Axis,
        e = Math.max(1, this.customSettingsValues()[epiviz.plugins.charts.ScatterPlotType.CustomSettings.CIRCLE_RADIUS_RATIO] * Math.min(this.width(), this.height())),
        f = Math.max(Math.floor(e), 1),
        g = Math.min(this._measurementsX.length, this._measurementsY.length),
        h = this.customSettingsValues()[epiviz.plugins.charts.ScatterPlotType.CustomSettings.ABS_LINE_VAL],
        m = b.firstSeries().globalStartIndex(),
        l = b.firstSeries().globalEndIndex();
    b.foreach(function(a, b) { var c = b.globalStartIndex(),
            d = b.globalEndIndex();
        c > m && (m = c);
        d < l && (l = d) });
    var n = l - m,
        p = this.margins(),
        t = this.width(),
        r = this.height(),
        q = epiviz.ui.charts.CustomSetting,
        u = this.customSettingsValues()[epiviz.ui.charts.Visualization.CustomSettings.Y_MIN],
        w = this.customSettingsValues()[epiviz.ui.charts.Visualization.CustomSettings.Y_MAX],
        v = this.customSettingsValues()[epiviz.ui.charts.Visualization.CustomSettings.X_MIN],
        z = this.customSettingsValues()[epiviz.ui.charts.Visualization.CustomSettings.X_MAX];
    v == q.DEFAULT && (v = this._measurementsX[0].minValue());
    u == q.DEFAULT && (u = this._measurementsY[0].minValue());
    z == q.DEFAULT && (z = this._measurementsX[0].maxValue());
    w == q.DEFAULT && (w = this._measurementsY[0].maxValue());
    var A = epiviz.measurements.Measurement.Type.isOrdered(this._measurementsX[0].type()),
        q = d3.scale.linear().domain([v, z]).range([0, t - p.sumAxis(d.X)]),
        E = d3.scale.linear().domain([u, w]).range([r - p.sumAxis(d.Y), 0]);
    this._clearAxes(this._chartContent);
    this._Axes(q, E, 15, 15, this._chartContent);
    var C,
        B, G = [];
    for (C = 0; C < n; ++C) { B = C + m; var y = b.getSeries(this._measurementsX[0]).getRowByGlobalIndex(B); if (y && (!A || void 0 == a.start() || void 0 == a.end() || y.start() < a.end() && y.end() > a.start()))
            for (y = 0; y < g; ++y) G.push(y * n + C) }
    var y = {},
        g = [],
        x = 1;
    for (C = 0; C < G.length; ++C) {
        B = G[C] % n;
        var F = B + m,
            A = Math.floor(G[C] / n);
        B = c._measurementsX[A];
        var D = c._measurementsY[A],
            H = b.getSeries(B).getByGlobalIndex(F),
            F = b.getSeries(D).getByGlobalIndex(F);
        if (H && F) {
            var L = sprintf("item data-series-%s", A),
                K = q(H.value),
                I = E(F.value),
                K = Math.floor(K /
                    f) * f,
                I = Math.floor(I / f) * f,
                J = null;
            y[I] && y[I][K] ? (J = y[I][K], J.id += "_" + H.globalIndex, J.start = Math.min(J.start, H.rowItem.start()), J.end = Math.max(J.end, H.rowItem.end()), J.values[0] = (J.values[0] * J.valueItems[0].length + H.value) / (J.valueItems[0].length + 1), J.values[1] = (J.values[1] * J.valueItems[1].length + F.value) / (J.valueItems[1].length + 1), J.valueItems[0].push(H), J.valueItems[1].push(F), J.valueItems[0].length > x && (x = J.valueItems[0].length)) : (J = new epiviz.ui.charts.ChartObject(sprintf("scatter_%s_%s", A, H.globalIndex),
                H.rowItem.start(), H.rowItem.end(), [H.value, F.value], A, [
                    [H],
                    [F]
                ], [B, D], L), y[I] || (y[I] = {}), y[I][K] = J, g.push(J))
        }
    }
    f = this._chartContent.select(".items");
    f.empty() && (f = this._chartContent.append("g").attr("class", "items"), n = f.append("g").attr("class", "selected"), f.append("g").attr("class", "hovered"), n.append("g").attr("class", "hovered"));
    n = f.selectAll("circle").data(g, function(a) { return a.id });
    n.enter().insert("circle", ":first-child").attr("id", function(a) {
        return sprintf("%s-item-%s-%s", c.id(), a.seriesIndex,
            a.valueItems[0][0].globalIndex)
    }).style("opacity", 0).style("fill-opacity", 0).attr("r", 0);
    n.each(function(a) { var b = d3.select(this),
            e;
        e = c._globalIndexColorLabels ? c.colors().getByKey(c._globalIndexColorLabels[a.valueItems[0][0].globalIndex]) : c.colors().get(a.seriesIndex);
        b.attr("cx", p.left() + (a.values[0] - v) * (t - p.sumAxis(d.X)) / (z - v)).attr("cy", r - p.bottom() - (a.values[1] - u) * (r - p.sumAxis(d.Y)) / (w - u)).attr("class", a.cssClasses).style("fill", e) });
    n.transition().duration(1E3).style("fill-opacity", function(a) {
        return Math.max(.6,
            a.valueItems[0].length / x)
    }).style("opacity", null).attr("r", e);
    n.exit().transition().duration(1E3).style("opacity", 0).attr("r", 0).remove();
    n.on("mouseover", function(a) { c._hover.notify(new epiviz.ui.charts.VisEventArgs(c.id(), a)) }).on("mouseout", function() { c._unhover.notify(new epiviz.ui.charts.VisEventArgs(c.id())) }).on("click", function(a) { c._deselect.notify(new epiviz.ui.charts.VisEventArgs(c.id()));
        c._select.notify(new epiviz.ui.charts.VisEventArgs(c.id(), a));
        d3.event.stopPropagation() });
    if (this._globalIndexColorLabels) {
        e = {};
        for (y = m; y < l; ++y) e[this._globalIndexColorLabels[y]] = this._globalIndexColorLabels[y];
        this._colorLabels = Object.keys(e);
        this._svg.selectAll(".chart-title").remove();
        this._svg.selectAll(".chart-title-color ").remove();
        e = this._svg.selectAll(".chart-title").data(this._colorLabels);
        e.enter().append("text").attr("class", "chart-title").attr("font-weight", "bold").attr("y", c.margins().top() - 5);
        e.attr("fill", function(a, b) { return c.colors().getByKey(a) }).text(function(a) { return a });
        var M = 0,
            N = [];
        $("#" + this.id() +
            " .chart-title").each(function(a) { N.push(M);
            M += this.getBBox().width + 15 });
        e.attr("x", function(a, b) { return c.margins().left() + 10 + N[b] });
        this._svg.selectAll(".chart-title-color").data(this._colorLabels).enter().append("circle").attr("class", "chart-title-color").attr("cx", function(a, b) { return c.margins().left() + 4 + N[b] }).attr("cy", c.margins().top() - 9).attr("r", 4).style("shape-rendering", "auto").style("stroke-width", "0").attr("fill", function(a, b) { return c.colors().getByKey(a) }).style("stroke-width", 0)
    } else {
        e =
            Math.min(this._measurementsX.length, this._measurementsY.length);
        n = Array(e);
        for (y = 0; y < e; ++y) n[y] = sprintf("%s vs %s", this._measurementsX[y].name(), this._measurementsY[y].name());
        this._colorLabels = n
    }
    h != epiviz.ui.charts.CustomSetting.DEFAULT && (f.selectAll(".abLine").remove(), f.append("svg:line").attr("class", "abLine").attr("x1", p.left() + (v - v) * (t - p.sumAxis(d.X)) / (z - v)).attr("x2", p.left() + (z - v) * (t - p.sumAxis(d.X)) / (z - v)).attr("y1", r - p.bottom() - (h - u) * (r - p.sumAxis(d.Y)) / (w - u)).attr("y2", r - p.bottom() - (h - u) *
        (r - p.sumAxis(d.Y)) / (w - u)).style("stroke", "black").style("stroke-dasharray", "5, 5"));
    return g
};
epiviz.plugins.charts.ScatterPlot.prototype.colorLabels = function() { return this._colorLabels };
epiviz.plugins.charts.ScatterPlot.prototype._Axes = function(a, b, c, d, e, f, g, h) {
    epiviz.ui.charts.Plot.prototype._Axes.call(this, a, b, c, d, e, f, g, h);
    this._legend.selectAll("text").remove();
    a = this._measurementsX;
    var m = this;
    this._legend.selectAll(".x-measurement").remove();
    this._legend.selectAll(".x-measurement-color").remove();
    b = this._legend.selectAll(".x-measurement").data(a).enter().append("text").attr("class", "x-measurement").attr("font-weight", "bold").attr("fill", function(a, b) {
        return m._globalIndexColorLabels ?
            "#000000" : m.colors().get(b)
    }).attr("y", this.height() - this.margins().bottom() + 35).text(function(a, b) { return a.name() });
    var l = 0,
        n = [];
    $("#" + this.id() + " .x-measurement").each(function(a) { n.push(l);
        l += this.getBBox().width + 15 });
    b.attr("x", function(a, b) { return .5 * (m.width() - l) + 7 + n[b] });
    this._legend.selectAll(".x-measurement-color").data(a).enter().append("circle").attr("class", "x-measurement-color").attr("cx", function(a, b) { return .5 * (m.width() - l) + 1 + n[b] }).attr("cy", this.height() - this.margins().bottom() + 31).attr("r",
        4).style("shape-rendering", "auto").style("stroke-width", "0").style("fill", function(a, b) { return m._globalIndexColorLabels ? "#ffffff" : m.colors().get(b) });
    a = this._measurementsY;
    this._legend.selectAll(".y-measurement").remove();
    this._legend.selectAll(".y-measurement-color").remove();
    b = this._legend.selectAll(".y-measurement").data(a).enter().append("text").attr("class", "y-measurement").attr("font-weight", "bold").attr("fill", function(a, b) { return m._globalIndexColorLabels ? "#000000" : m.colors().get(b) }).attr("y",
        this.margins().left() - 35).attr("transform", "rotate(-90)").text(function(a, b) { return a.name() });
    var p = 0,
        t = [];
    $("#" + this.id() + " .y-measurement").each(function(a) { t.push(p);
        p += this.getBBox().width + 15 });
    b.attr("x", function(a, b) { return -m.height() + .5 * (m.height() - p) + 12 + m.margins().top() + t[b] });
    this._legend.selectAll(".y-measurement-color").data(a).enter().append("circle").attr("class", "y-measurement-color").attr("cx", function(a, b) { return -m.height() + .5 * (m.height() - p) + 6 + m.margins().top() + t[b] }).attr("cy",
        this.margins().left() - 39).attr("transform", "rotate(-90)").attr("r", 4).style("shape-rendering", "auto").style("stroke-width", "0").style("fill", function(a, b) { return m._globalIndexColorLabels ? "#ffffff" : m.colors().get(b) })
};
epiviz.ui.charts.PlotType = function(a) { epiviz.ui.charts.ChartType.call(this, a) };
epiviz.ui.charts.PlotType.prototype = epiviz.utils.mapCopy(epiviz.ui.charts.ChartType.prototype);
epiviz.ui.charts.PlotType.constructor = epiviz.ui.charts.PlotType;
epiviz.ui.charts.PlotType.prototype.chartDisplayType = function() { return epiviz.ui.charts.VisualizationType.DisplayType.PLOT };
epiviz.ui.charts.PlotType.prototype.cssClass = function() { return "plot-container ui-widget-content" };
epiviz.plugins.charts.ScatterPlotType = function(a) { epiviz.ui.charts.PlotType.call(this, a) };
epiviz.plugins.charts.ScatterPlotType.prototype = epiviz.utils.mapCopy(epiviz.ui.charts.PlotType.prototype);
epiviz.plugins.charts.ScatterPlotType.constructor = epiviz.plugins.charts.ScatterPlotType;
epiviz.plugins.charts.ScatterPlotType.prototype.createNew = function(a, b, c) { return new epiviz.plugins.charts.ScatterPlot(a, b, c) };
epiviz.plugins.charts.ScatterPlotType.prototype.typeName = function() { return "epiviz.plugins.charts.ScatterPlot" };
epiviz.plugins.charts.ScatterPlotType.prototype.chartName = function() { return "Scatter Plot" };
epiviz.plugins.charts.ScatterPlotType.prototype.chartHtmlAttributeName = function() { return "scatter" };
epiviz.plugins.charts.ScatterPlotType.prototype.measurementsFilter = function() { return function(a) { return epiviz.measurements.Measurement.Type.hasValues(a.type()) } };
epiviz.plugins.charts.ScatterPlotType.prototype.isRestrictedToSameDatasourceGroup = function() { return !0 };
epiviz.plugins.charts.ScatterPlotType.prototype.minSelectedMeasurements = function() { return 2 };
epiviz.plugins.charts.ScatterPlotType.prototype.customSettingsDefs = function() {
    return epiviz.ui.charts.PlotType.prototype.customSettingsDefs.call(this).concat([new epiviz.ui.charts.CustomSetting(epiviz.plugins.charts.ScatterPlotType.CustomSettings.CIRCLE_RADIUS_RATIO, epiviz.ui.charts.CustomSetting.Type.NUMBER, .015, "Circle radius ratio"), new epiviz.ui.charts.CustomSetting(epiviz.ui.charts.Visualization.CustomSettings.X_MIN, epiviz.ui.charts.CustomSetting.Type.NUMBER, epiviz.ui.charts.CustomSetting.DEFAULT,
        "Min X"), new epiviz.ui.charts.CustomSetting(epiviz.ui.charts.Visualization.CustomSettings.X_MAX, epiviz.ui.charts.CustomSetting.Type.NUMBER, epiviz.ui.charts.CustomSetting.DEFAULT, "Max X"), new epiviz.ui.charts.CustomSetting(epiviz.ui.charts.Visualization.CustomSettings.Y_MIN, epiviz.ui.charts.CustomSetting.Type.NUMBER, epiviz.ui.charts.CustomSetting.DEFAULT, "Min Y"), new epiviz.ui.charts.CustomSetting(epiviz.ui.charts.Visualization.CustomSettings.Y_MAX, epiviz.ui.charts.CustomSetting.Type.NUMBER, epiviz.ui.charts.CustomSetting.DEFAULT,
        "Max Y"), new epiviz.ui.charts.CustomSetting(epiviz.plugins.charts.ScatterPlotType.CustomSettings.ABS_LINE_VAL, epiviz.ui.charts.CustomSetting.Type.NUMBER, epiviz.ui.charts.CustomSetting.DEFAULT, " abline")])
};
epiviz.plugins.charts.ScatterPlotType.CustomSettings = { CIRCLE_RADIUS_RATIO: "circleRadiusRatio", ABS_LINE_VAL: "abLine" };
epiviz.plugins.charts.GenesTrack = function(a, b, c) { epiviz.ui.charts.Track.call(this, a, b, c);
    this._initialize() };
epiviz.plugins.charts.GenesTrack.prototype = epiviz.utils.mapCopy(epiviz.ui.charts.Track.prototype);
epiviz.plugins.charts.GenesTrack.constructor = epiviz.plugins.charts.GenesTrack;
epiviz.plugins.charts.GenesTrack.prototype._initialize = function() { epiviz.ui.charts.Track.prototype._initialize.call(this);
    this._svg.classed("genes-track", !0) };
epiviz.plugins.charts.GenesTrack.prototype. = function(a, b, c, d) { epiviz.ui.charts.Track.prototype..call(this, a, b, c, d);
    b = this._lastData;
    a = this._lastRange; if (!b || !a) return [];
    c = c || this._slide;
    d = d || this._zoom;
    this._slide = 0;
    this._zoom = 1; return this._Genes(a, b, c || 0, d || 1) };
epiviz.plugins.charts.GenesTrack.prototype._Genes = function(a, b, c, d) {
    var e = epiviz.ui.charts.Axis,
        f = a.start(),
        g = a.end();
    a = this.width();
    var h = this.height(),
        m = this.margins(),
        l = d3.scale.linear().domain([f, g]).range([0, a - m.sumAxis(e.X)]),
        n = c * (a - m.sumAxis(e.X)) / (g - f);
    this._clearAxes();
    this._Axes(l, null, 10, 5);
    var p = this,
        t = b.firstSeries();
    b = epiviz.utils.range(t.size()).map(function(a) {
        a = t.get(a);
        var b = a.rowItem,
            c = sprintf("item gene-%s", b.metadata("gene"));
        return new epiviz.ui.charts.ChartObject(b.metadata("gene"),
            b.start(), b.end(), null, 0, [
                [a]
            ], [t.measurement()], c)
    });
    d && (this._svg.select(".items").remove(), this._svg.select("defs").select("#clip-" + this.id()).remove());
    d = this._svg.select(".items");
    c = d.select(".selected");
    d.empty() && (this._svg.select("defs").append("clipPath").attr("id", "clip-" + this.id()).append("rect").attr("x", 0).attr("y", 0).attr("width", a - m.sumAxis(e.X)).attr("height", h - m.sumAxis(e.Y)), d = this._svg.append("g").attr("class", "items").attr("transform", "translate(" + m.left() + ", " + m.top() + ")").attr("id",
        this.id() + "-gene-content").attr("clip-path", "url(#clip-" + this.id() + ")"), c = d.append("g").attr("class", "selected"), d.append("g").attr("class", "hovered"), c.append("g").attr("class", "hovered"));
    e = d.selectAll(".item").data(b, function(a) { return a.id });
    e.enter().insert("g", ":first-child").on("mouseout", function() { p._unhover.notify(new epiviz.ui.charts.VisEventArgs(p.id())) }).on("mouseover", function(a) { p._hover.notify(new epiviz.ui.charts.VisEventArgs(p.id(), a)) }).on("click", function(a) {
        p._deselect.notify(new epiviz.ui.charts.VisEventArgs(p.id()));
        p._select.notify(new epiviz.ui.charts.VisEventArgs(p.id(), a));
        d3.event.stopPropagation()
    }).attr("transform", "translate(" + n + ", 0) scale(1, 1)").each(function(a) { p._Gene(this, a, l) });
    n && e.each(function(a) { p._translateGene(this, a, n) });
    e.exit().transition().duration(500).style("opacity", 0).remove();
    return b
};
epiviz.plugins.charts.GenesTrack.prototype._translateGene = function(a, b, c) { a = d3.select(a);
    b = a.attr("transform"); var d = RegExp("translate\\([\\d\\.\\-]+[\\,\\s]+[\\d\\.\\-]+\\)", "g"),
        e = RegExp("[\\d\\.\\-]+", "g"),
        f = b.match(d)[0],
        e = parseFloat(f.match(e)[0]);
    b = b.replace(d, "translate(" + (e - c) + ", 0)");
    a.transition().duration(500).attr("transform", b) };
epiviz.plugins.charts.GenesTrack.prototype._Gene = function(a, b, c) {
    var d = epiviz.ui.charts.Axis,
        e = this,
        f = b.valueItems[0][0].rowItem,
        g = c(b.start),
        h = c(b.end),
        m = "+" == f.strand() ? 1 : -1,
        l = -m * (this.height() - this.margins().sumAxis(d.Y)) * .25,
        n = f.metadata("exon_starts").split(",").map(function(a) { return parseInt(a) }),
        p = f.metadata("exon_ends").split(",").map(function(a) { return parseInt(a) }),
        t = d3.range(0, n.length),
        r = .08 * this.height(),
        q = .16 * this.height(),
        u = r * Math.sqrt(3) * .5;
    a = d3.select(a);
    a.attr("class", b.cssClasses);
    a.append("polygon").attr("class", "gene-body").style("fill", this.colors().get(0)).attr("points", function() { var a, b;
        a = .5 * (e.height() - e.margins().sumAxis(d.Y) - r) + l;
        b = [a, a, a + .5 * r, a + r, a + r];
        a = "+" == f.strand() ? [g, h, h + u, h, g] : [h, g, g - u, g, h]; return sprintf("%s,%s %s,%s %s,%s %s,%s %s,%s", a[0], b[0], a[1], b[1], a[2], b[2], a[3], b[3], a[4], b[4]) });
    a.append("g").attr("class", "exons").style("fill", this.colors().get(1)).selectAll("rect").data(t).enter().append("rect").attr("x", function(a) { return c(n[a]) }).attr("y", .5 * (e.height() -
        q - e.margins().sumAxis(d.Y)) + l).attr("width", function(a) { return c(p[a]) - c(n[a]) }).attr("height", q);
    a.append("text").attr("class", "gene-name").attr("x", g + 2).attr("y", .5 * (e.height() - e.margins().sumAxis(d.Y)) + l - m * (r + 2)).style("dominant-baseline", "central").text(b.id)
};
epiviz.plugins.charts.GenesTrack.prototype.colorLabels = function() { return ["Genes", "Exons"] };
epiviz.plugins.charts.GenesTrack.prototype._Axes = function(a, b, c, d, e, f, g, h) {
    epiviz.ui.charts.Track.prototype._Axes.call(this, a, b, c, d, e, f, g, h);
    a = epiviz.ui.charts.Axis;
    this._svg.select(".axes").append("g").attr("class", "xAxis").append("line").attr("x1", this.margins().left()).attr("x2", this.width() - this.margins().left()).attr("y1", this.margins().top() + .5 * (this.height() - this.margins().sumAxis(a.Y))).attr("y2", this.margins().top() + .5 * (this.height() - this.margins().sumAxis(a.Y))).style("stroke", "#555555").style("shape-rendering",
        "crispEdges")
};
epiviz.plugins.charts.GenesTrackType = function(a) { epiviz.ui.charts.TrackType.call(this, a) };
epiviz.plugins.charts.GenesTrackType.prototype = epiviz.utils.mapCopy(epiviz.ui.charts.TrackType.prototype);
epiviz.plugins.charts.GenesTrackType.constructor = epiviz.plugins.charts.GenesTrackType;
epiviz.plugins.charts.GenesTrackType.prototype.createNew = function(a, b, c) { return new epiviz.plugins.charts.GenesTrack(a, b, c) };
epiviz.plugins.charts.GenesTrackType.prototype.typeName = function() { return "epiviz.plugins.charts.GenesTrack" };
epiviz.plugins.charts.GenesTrackType.prototype.chartName = function() { return "Genes Track" };
epiviz.plugins.charts.GenesTrackType.prototype.chartHtmlAttributeName = function() { return "genes" };
epiviz.plugins.charts.GenesTrackType.prototype.isRestrictedToRangeMeasurements = function() { return !0 };
epiviz.plugins.charts.GenesTrackType.prototype.measurementsFilter = function() { return function(a) { return a.type() == epiviz.measurements.Measurement.Type.RANGE } };
epiviz.ui.charts.transform = {};
epiviz.ui.charts.transform.clustering = {};
epiviz.ui.charts.transform.clustering.ClusterSubtree = function(a, b) { this._children = a;
    this._weight = null;
    this._distance = b;
    this._sorted = !1 };
epiviz.ui.charts.transform.clustering.ClusterSubtree.prototype.weight = function() { if (void 0 == this._weight) { for (var a = 0, b = 0; b < this._children.length; ++b) a += this._children[b].weight();
        this._weight = a } return this._weight };
epiviz.ui.charts.transform.clustering.ClusterSubtree.prototype.children = function() { return this._children };
epiviz.ui.charts.transform.clustering.ClusterSubtree.prototype.data = function() { for (var a = [], b = 0; b < this._children.length; ++b) a = a.concat(this._children[b].data()); return a };
epiviz.ui.charts.transform.clustering.ClusterSubtree.prototype.sort = function(a) { if (!this.sorted() && (this._children.sort(function(a, b) { return a.weight() - b.weight() }), a)) { for (var b = 0; b < this._children.length; ++b) this._children[b].sort(a);
        this._sorted = !0 } };
epiviz.ui.charts.transform.clustering.ClusterSubtree.prototype.copy = function() { for (var a = [], b = 0; b < this._children.length; ++b) a.push(this._children[b].copy()); return new epiviz.ui.charts.transform.clustering.ClusterSubtree(a) };
epiviz.ui.charts.transform.clustering.ClusterSubtree.prototype.distance = function() { return this._distance };
epiviz.ui.charts.transform.clustering.ClusterSubtree.prototype.sorted = function() { return this._sorted };
epiviz.ui.charts.transform.clustering.ClusterLeaf = function(a) { this._dataIndex = a };
epiviz.ui.charts.transform.clustering.ClusterLeaf.prototype.weight = function() { return 1 };
epiviz.ui.charts.transform.clustering.ClusterLeaf.prototype.children = function() { return [] };
epiviz.ui.charts.transform.clustering.ClusterLeaf.prototype.data = function() { return [this._dataIndex] };
epiviz.ui.charts.transform.clustering.ClusterLeaf.prototype.sort = function() {};
epiviz.ui.charts.transform.clustering.ClusterLeaf.prototype.copy = function() { return new epiviz.ui.charts.transform.clustering.ClusterLeaf(this._dataIndex) };
epiviz.ui.charts.transform.clustering.ClusterLeaf.prototype.distance = function() { return 0 };
epiviz.ui.charts.transform.clustering.ClusterLeaf.prototype.sorted = function() { return !0 };
epiviz.ui.charts.transform.clustering.ClusterTree = function(a, b) { this._root = a;
    this._data = b };
epiviz.ui.charts.transform.clustering.ClusterTree.prototype.root = function() { return this._root };
epiviz.ui.charts.transform.clustering.ClusterTree.prototype.orderedData = function() { this._root.sorted() || this._root.sort(!0); for (var a = this._root.data(), b = [], c = 0; c < a.length; ++c) b.push(this._data[a[c]]); return b };
epiviz.ui.charts.transform.clustering.NoneClustering = function() {};
epiviz.ui.charts.transform.clustering.NoneClustering.prototype.cluster = function(a, b, c) { b = []; for (c = 0; c < a.length; ++c) b.push(new epiviz.ui.charts.transform.clustering.ClusterLeaf(c));
    b = new epiviz.ui.charts.transform.clustering.ClusterSubtree(b, 0); return new epiviz.ui.charts.transform.clustering.ClusterTree(b, a) };
epiviz.ui.charts.transform.clustering.NoneClustering.prototype.id = function() { return "none" };
epiviz.ui.charts.transform.clustering.AgglomerativeClustering = function() {};
epiviz.ui.charts.transform.clustering.AgglomerativeClustering.prototype.cluster = function(a, b, c) {
    var d, e, f = Array(a.length);
    for (d = 0; d < a.length; ++d)
        for (f[d] = Array(a.length), e = d + 1; e < a.length; ++e) f[d][e] = b.distance(a[d], a[e]);
    b = [];
    for (d = 0; d < a.length; ++d) b.push(new epiviz.ui.charts.transform.clustering.ClusterLeaf(d));
    for (; 1 < b.length;) {
        e = epiviz.utils.indexOfMin(f, !0);
        d = e.index;
        e = new epiviz.ui.charts.transform.clustering.ClusterSubtree([b[d[0]], b[d[1]]], e.min);
        if (d[0] < d[1]) { var g = d[0];
            d[0] = d[1];
            d[1] = g }
        b.splice(d[0],
            1);
        b.splice(d[1], 1);
        b.push(e);
        f = c.link(f, d)
    }
    return new epiviz.ui.charts.transform.clustering.ClusterTree(b[0], a)
};
epiviz.ui.charts.transform.clustering.AgglomerativeClustering.prototype.id = function() { return "agglomerative" };
epiviz.ui.charts.transform.clustering.HierarchicalClusteringAlgorithm = function() {};
epiviz.ui.charts.transform.clustering.HierarchicalClusteringAlgorithm.prototype.cluster = function(a, b, c) {};
epiviz.ui.charts.transform.clustering.HierarchicalClusteringAlgorithm.prototype.id = function() {};
epiviz.ui.charts.transform.clustering.EuclideanMetric = function() {};
epiviz.ui.charts.transform.clustering.EuclideanMetric.prototype.distance = function(a, b) { if (void 0 == a || void 0 == b) return null; var c = a.length,
        d = 0,
        e = 0,
        f = 0,
        g; for (g = 0; g < c; ++g)
        if (void 0 != a[g] && void 0 != b[g]) {++d; var h = a[g] - b[g],
                e = e + h,
                f = f + h * h }
    0 < d && (e /= d); return f + (c - d) * e * e };
epiviz.ui.charts.transform.clustering.EuclideanMetric.prototype.id = function() { return "euclidean" };
epiviz.ui.charts.transform.clustering.CompleteLinkage = function() {};
epiviz.ui.charts.transform.clustering.CompleteLinkage.prototype.link = function(a, b) { var c = Array(a.length - 1); if (b[0] < b[1]) { var d = b[0];
        b[0] = b[1];
        b[1] = d } for (var e = d = 0; d < a.length; ++d, ++e)
        if (d == b[0] || d == b[1]) --e;
        else { c[e] = a[d].slice(0);
            c[e].splice(b[0], 1);
            c[e].splice(b[1], 1); var f = [d < b[0] ? a[d][b[0]] : a[b[0]][d], d < b[1] ? a[d][b[1]] : a[b[1]][d]];
            c[e].push(Math.max(f[0], f[1])) }
    c[c.length - 1] = Array(c.length); return c };
epiviz.ui.charts.transform.clustering.CompleteLinkage.prototype.id = function() { return "complete" };
epiviz.ui.charts.transform.clustering.ClusteringLinkage = function() {};
epiviz.ui.charts.transform.clustering.ClusteringLinkage.prototype.link = function(a, b) {};
epiviz.ui.charts.transform.clustering.ClusteringLinkage.prototype.id = function() {};
epiviz.ui.charts.transform.clustering.ClusteringAlgorithmFactory = function(a) {
    this._config = a;
    this._algorithms = {};
    this._metrics = {};
    this._linkages = {};
    var b;
    for (b = 0; b < a.clustering.algorithms.length; ++b) { var c = epiviz.utils.evaluateFullyQualifiedTypeName(a.clustering.algorithms[b]),
            c = epiviz.utils.applyConstructor(c);
        this._algorithms[c.id()] = c }
    for (b = 0; b < a.clustering.metrics.length; ++b) c = epiviz.utils.evaluateFullyQualifiedTypeName(a.clustering.metrics[b]), c = epiviz.utils.applyConstructor(c), this._metrics[c.id()] =
        c;
    for (b = 0; b < a.clustering.linkages.length; ++b) c = epiviz.utils.evaluateFullyQualifiedTypeName(a.clustering.linkages[b]), c = epiviz.utils.applyConstructor(c), this._linkages[c.id()] = c
};
epiviz.ui.charts.transform.clustering.ClusteringAlgorithmFactory._instance = null;
epiviz.ui.charts.transform.clustering.ClusteringAlgorithmFactory.instance = function() { return epiviz.ui.charts.transform.clustering.ClusteringAlgorithmFactory._instance };
epiviz.ui.charts.transform.clustering.ClusteringAlgorithmFactory.initialize = function(a) { epiviz.ui.charts.transform.clustering.ClusteringAlgorithmFactory._instance = new epiviz.ui.charts.transform.clustering.ClusteringAlgorithmFactory(a) };
epiviz.ui.charts.transform.clustering.ClusteringAlgorithmFactory.prototype.algorithm = function(a) { return this._algorithms[a] };
epiviz.ui.charts.transform.clustering.ClusteringAlgorithmFactory.prototype.metric = function(a) { return this._metrics[a] };
epiviz.ui.charts.transform.clustering.ClusteringAlgorithmFactory.prototype.linkage = function(a) { return this._linkages[a] };
epiviz.ui.charts.transform.clustering.ClusteringAlgorithmFactory.prototype.algorithms = function() { return Object.keys(this._algorithms) };
epiviz.ui.charts.transform.clustering.ClusteringAlgorithmFactory.prototype.metrics = function() { return Object.keys(this._metrics) };
epiviz.ui.charts.transform.clustering.ClusteringAlgorithmFactory.prototype.linkages = function() { return Object.keys(this._linkages) };
epiviz.plugins.charts.HeatmapPlot = function(a, b, c) { epiviz.ui.charts.Plot.call(this, a, b, c);
    this._chartContent = null;
    this._min = this.measurements().first().minValue();
    this._max = this.measurements().first().maxValue();
    this._colorScale = epiviz.utils.colorizeBinary(this._min, this._max, "#ffffff", this.colors().getByKey("Max"));
    this._colorLabels = [];
    this._dendrogramRatio = .1;
    this._initialize() };
epiviz.plugins.charts.HeatmapPlot.prototype = epiviz.utils.mapCopy(epiviz.ui.charts.Plot.prototype);
epiviz.plugins.charts.HeatmapPlot.constructor = epiviz.plugins.charts.HeatmapPlot;
epiviz.plugins.charts.HeatmapPlot.prototype._initialize = function() { epiviz.ui.charts.Plot.prototype._initialize.call(this);
    this._svg.classed("heatmap-plot", !0);
    this._chartContent = this._svg.append("g").attr("class", "chart-content") };
epiviz.plugins.charts.HeatmapPlot.prototype. = function(a, b) { epiviz.ui.charts.Plot.prototype..call(this, a, b);
    b = this._lastData;
    a = this._lastRange; if (!b || !a) return [];
    this.customSettingsValues(); var c = this._applyClustering(a, b); return this._Cells(a, c.data, c.columnOrder) };
epiviz.plugins.charts.HeatmapPlot.prototype._applyClustering = function(a, b) {
    var c = epiviz.measurements.Measurement.Type.isOrdered(this.measurements().first().type()),
        d = this.customSettingsValues()[epiviz.plugins.charts.HeatmapPlotType.CustomSettings.CLUSTER],
        e = this.customSettingsValues()[epiviz.plugins.charts.HeatmapPlotType.CustomSettings.SHOW_DENDROGRAM],
        f = epiviz.ui.charts.transform.clustering.ClusteringAlgorithmFactory.instance(),
        g = f.algorithm(this.customSettingsValues()[epiviz.plugins.charts.HeatmapPlotType.CustomSettings.CLUSTERING_ALG]),
        h = f.metric(this.customSettingsValues()[epiviz.plugins.charts.HeatmapPlotType.CustomSettings.CLUSTERING_METRIC]),
        m = f.linkage(this.customSettingsValues()[epiviz.plugins.charts.HeatmapPlotType.CustomSettings.CLUSTERING_LINKAGE]),
        l = this.customSettingsValues()[epiviz.plugins.charts.HeatmapPlotType.CustomSettings.MAX_COLUMNS],
        n = b.firstSeries().globalStartIndex(),
        p = b.firstSeries().size() + n;
    b.foreach(function(a, b) { var c = b.globalStartIndex(),
            d = b.globalEndIndex();
        c > n && (n = c);
        d < p && (p = d) });
    var t = p - n,
        f = d == epiviz.plugins.charts.HeatmapPlotType.Cluster.ROWS ||
        d == epiviz.plugins.charts.HeatmapPlotType.Cluster.BOTH,
        r = d == epiviz.plugins.charts.HeatmapPlotType.Cluster.COLS || d == epiviz.plugins.charts.HeatmapPlotType.Cluster.BOTH,
        d = e * this._dendrogramRatio,
        l = e && r && l >= t,
        q, u, w, v, z, A, E = this._svg;
    ["dendrogram-horizontal", "dendrogram-vertical"].forEach(function(a) { E.select("." + a).remove() });
    var C = b;
    if (f) {
        q = [];
        b.foreach(function(b, d) {
            for (var e = [], f = 0; f < t; ++f) {
                var g = d.getByGlobalIndex(f + n),
                    h = g.rowItem;
                (!c || void 0 == a.start() || void 0 == a.end() || h.start() < a.end() && h.end() >=
                    a.start()) && e.push(g.value)
            }
            q.push(e)
        });
        e = g.cluster(q, h, m);
        u = e.root().data();
        var B = [];
        b.foreach(function(a) { B.push(a) });
        w = [];
        for (v = 0; v < u.length; ++v) w[v] = B[u[v]];
        u = new epiviz.measurements.MeasurementHashtable;
        for (v = 0; v < w.length; ++v) u.put(w[v], b.getSeries(w[v]));
        C = new epiviz.datatypes.MapGenomicData(u);
        d && (A = this.width() * d, z = this.height() * (1 - d * l) - this.margins().sumAxis(epiviz.ui.charts.Axis.Y), w = this.margins().top(), v = this.width() - A - this.margins().right(), this._Dendrogram(e, w, v, z, A))
    }
    u = null;
    if (r) {
        q = [];
        b.foreach(function(b, d) { for (var e = 0, f = 0; e < t; ++e) { var g = d.getByGlobalIndex(e + n),
                    h = g.rowItem; if (!c || void 0 == a.start() || void 0 == a.end() || h.start() < a.end() && h.end() >= a.start()) q.length <= f && q.push([]), q[f].push(g.value), ++f } });
        if (0 == q.length) return { data: C, columnOrder: [] };
        e = g.cluster(q, h, m);
        u = e.root().data();
        l && (g = this.customSettingsValues()[epiviz.plugins.charts.HeatmapPlotType.CustomSettings.SHOW_COLORS_FOR_ROW_LABELS] ? 20 : 0, v = this.margins().left(), w = this.height() * (1 - d) - this.margins().bottom(), A = this.height() *
            d, z = this.width() * (1 - d * f) - this.margins().left() - this.margins().right() - g, this._Dendrogram(e, w, v, z, A, !0))
    }
    return { data: C, columnOrder: u }
};
epiviz.plugins.charts.HeatmapPlot.prototype._Cells = function(a, b, c) {
    var d = this,
        e = epiviz.ui.charts.Axis,
        f = this.customSettingsValues()[epiviz.plugins.charts.HeatmapPlotType.CustomSettings.MAX_COLUMNS],
        g = b.firstSeries().globalStartIndex(),
        h = b.firstSeries().size() + g,
        m = [],
        l = epiviz.measurements.Measurement.Type.isOrdered(this.measurements().first().type());
    b.foreach(function(a, b) { var c = b.globalStartIndex(),
            d = b.globalEndIndex();
        c > g && (g = c);
        d < h && (h = d);
        m.push(a) });
    for (var n = h - g, p = this.customSettingsValues()[epiviz.ui.charts.Visualization.CustomSettings.COL_LABEL],
            t = this.customSettingsValues()[epiviz.plugins.charts.HeatmapPlotType.CustomSettings.CLUSTER], r = t == epiviz.plugins.charts.HeatmapPlotType.Cluster.ROWS || t == epiviz.plugins.charts.HeatmapPlotType.Cluster.BOTH, t = (t == epiviz.plugins.charts.HeatmapPlotType.Cluster.COLS || t == epiviz.plugins.charts.HeatmapPlotType.Cluster.BOTH) && f >= n, q = this.customSettingsValues()[epiviz.plugins.charts.HeatmapPlotType.CustomSettings.SHOW_DENDROGRAM] * this._dendrogramRatio, u = this.customSettingsValues()[epiviz.plugins.charts.HeatmapPlotType.CustomSettings.SHOW_COLORS_FOR_ROW_LABELS] ?
            20 : 0, r = this.width() * (1 - q * r) - u, t = this.height() * (1 - q * t), w = [], v = [], z, q = 0; q < n; ++q) { z = q + g; var A;
        b.foreach(function(a, b) { return A = b.getRowByGlobalIndex(z) });
        A && (!l || void 0 == a.start() || void 0 == a.end() || A.start() < a.end() && A.end() >= a.start()) && (w.push(z), u = A.metadata(p) || "" + A.id(), v.push(u)) }
    if (c)
        for (a = w, l = v, w = Array(w.length), v = Array(v.length), q = 0; q < w.length; ++q) w[q] = a[c[q]], v[q] = l[c[q]];
    var E = [],
        C = {};
    b.foreach(function(a, b, c) {
        for (var d, e = 0, g = f, h = 0; h < v.length; ++h)
            if (z = w[h], d = b.getByGlobalIndex(z)) {
                var l;
                0 ==
                    e ? (e = sprintf("item data-series-%s", c), l = new epiviz.ui.charts.ChartObject(sprintf("heatmap_%s_%s", c, z), d.rowItem.start(), d.rowItem.end(), [d.value], c, [
                        [d]
                    ], [a], e), E.push(l), e = d = Math.ceil((v.length - h) / g), --g) : (l = E[E.length - 1], l.id += "_" + z, epiviz.measurements.Measurement.Type.isOrdered(b.measurement().type()) && (l.start = Math.min(l.start, d.rowItem.start()), l.end = Math.max(l.end, d.rowItem.end())), l.values[0] = (l.values[0] * l.valueItems[0].length + d.value) / (l.valueItems[0].length + 1), l.valueItems[0].push(d));
                0 ==
                    c && (C[z] = E.length - 1);
                --e
            }
    });
    var B;
    this._min = this.customSettingsValues()[epiviz.ui.charts.Visualization.CustomSettings.Y_MIN];
    this._max = this.customSettingsValues()[epiviz.ui.charts.Visualization.CustomSettings.Y_MAX];
    c = epiviz.ui.charts.CustomSetting;
    this._min == c.DEFAULT && (this._min = b.measurements()[0].minValue());
    this._max == c.DEFAULT && (this._max = b.measurements()[0].maxValue());
    if (this._globalIndexColorLabels) {
        c = {};
        for (a = g; a < h; ++a) c[this._globalIndexColorLabels[a]] = this._globalIndexColorLabels[a];
        this._colorLabels =
            Object.keys(c);
        B = {};
        this._colorLabels.forEach(function(a, b) { var c = d.colors().getByKey(a);
            B[a] = epiviz.utils.colorizeBinary(d._min, d._max, "#ffffff", c) })
    } else this._colorLabels = [sprintf("Max", b.firstSeries().measurement().maxValue())], this._colorScale = epiviz.utils.colorizeBinary(this._min, this._max, "#ffffff", this.colors().getByKey("Max"));
    var G = (c = Math.min(v.length, f)) ? (r - this.margins().sumAxis(e.X)) / c : 0,
        y = (t - this.margins().sumAxis(e.Y)) / b.measurements().length;
    b = this._chartContent.select(".items");
    b.empty() && (b = this._chartContent.append("g").attr("class", "items"), e = b.append("g").attr("class", "selected"), b.append("g").attr("class", "hovered"), e.append("g").attr("class", "hovered"));
    b.attr("transform", "translate(" + this.margins().left() + ", " + this.margins().top() + ")");
    e = b.selectAll("rect").data(E, function(a) { return a.id });
    e.enter().append("rect").attr("id", function(a) { return sprintf("%s-item-%s-%s", d.id(), a.seriesIndex, a.valueItems[0][0].globalIndex) }).attr("class", function(a) { return a.cssClasses }).style("opacity",
        0).style("fill-opacity", 0).attr("x", function(a) { return G * C[a.valueItems[0][0].globalIndex] }).attr("y", function(a) { return y * a.seriesIndex }).attr("width", G).attr("height", y).style("fill", function(a, b) { return d._globalIndexColorLabels ? B[d._globalIndexColorLabels[a.valueItems[0][0].globalIndex]](a.values[0]) : d._colorScale(a.values[0]) });
    e.transition().duration(1E3).style("fill-opacity", null).style("opacity", null).attr("x", function(a) { return G * C[a.valueItems[0][0].globalIndex] }).attr("y", function(a) {
        return y *
            a.seriesIndex
    }).attr("width", G).attr("height", y).style("fill", function(a) { return d._globalIndexColorLabels ? B[d._globalIndexColorLabels[a.valueItems[0][0].globalIndex]](a.values[0]) : d._colorScale(a.values[0]) });
    e.exit().transition().duration(1E3).style("opacity", 0).remove();
    e.on("mouseover", function(a) { d._hover.notify(new epiviz.ui.charts.VisEventArgs(d.id(), a)) }).on("mouseout", function() { d._unhover.notify(new epiviz.ui.charts.VisEventArgs(d.id())) }).on("click", function(a) {
        d._deselect.notify(new epiviz.ui.charts.VisEventArgs(d.id()));
        d._select.notify(new epiviz.ui.charts.VisEventArgs(d.id(), a));
        d3.event.stopPropagation()
    });
    this._Labels(b, v, w, c, m, G, y, g, r);
    return E
};
epiviz.plugins.charts.HeatmapPlot.prototype._Dendrogram = function(a, b, c, d, e, f) { var g = f ? "dendrogram-horizontal" : "dendrogram-vertical",
        h = this._svg.append("g").attr("class", g);
    f ? h.attr("transform", "translate(" + c + "," + b + ")scale(-1, 1)rotate(90, 0, 0)") : h.attr("transform", "translate(" + c + "," + b + ")");
    this._SubDendrogram(this._svg.select("." + g), a.root(), 0, 0, e, d, !1) };
epiviz.plugins.charts.HeatmapPlot.prototype._SubDendrogram = function(a, b, c, d, e, f, g) {
    var h = b.children();
    if (0 == h.length) return c + .5 * f;
    for (var m = d3.scale.linear().domain([0, b.distance()]).range([0, e]), l = 0, n, p, t = 0; t < h.length; ++t) {
        var r = c + l,
            q = f / b.weight() * h[t].weight(),
            u = m(h[t].distance()),
            r = this._SubDendrogram(a, h[t], r, d, u, q, g);
        a.append("line").attr("x1", d + u).attr("x2", d + e).attr("y1", r).attr("y2", r).style("stroke", "#555555").style("stroke-width", 1).style("shape-rendering", "auto");
        0 == t && g && a.append("text").attr("class",
            "row-text").attr("x", Math.max(d + 10, d + .5 * (u + e))).attr("y", r - 10).style("text-anchor", "middle").text(Globalize.format(b.distance(), "n2"));
        if (void 0 == n || n > r) n = r;
        if (void 0 == p || p < r) p = r;
        l += f / b.weight() * h[t].weight()
    }
    a.append("line").attr("x1", d + e).attr("x2", d + e).attr("y1", n).attr("y2", p).style("stroke", "#555555").style("stroke-width", 1).style("shape-rendering", "auto");
    return .5 * (n + p)
};
epiviz.plugins.charts.HeatmapPlot.prototype._Labels = function(a, b, c, d, e, f, g, h, m) {
    var l = this,
        n = function(a) { a = "name" == r ? a.name() : (a = a.annotation()) && r in a ? a[r] : "<NA>"; return u[a] = a },
        p = a.selectAll(".col-text"),
        t = 0;
    b.length > d ? p.transition().duration(500).style("opacity", 0).remove() : (p = p.data(b, function(a, b) { return a + c[b] }), p.enter().append("text").attr("class", "col-text").style("opacity", "0").attr("x", 0).attr("y", 0).attr("transform", function(a, b) { return "translate(" + (b * f + .5 * f) + ",-5)rotate(-60)" }).text(function(a) { return a }),
        p.transition().duration(500).attr("x", 0).attr("y", 0).attr("transform", function(a, b) { return "translate(" + (b * f + .5 * f) + ",-5)rotate(-60)" }).style("opacity", null).attr("fill", function(a, b) { var c = b + h; return l._globalIndexColorLabels ? l.colors().getByKey(l._globalIndexColorLabels[c]) : "#000000" }), p.exit().transition().duration(500).style("opacity", 0).remove(), $("#" + this.id() + " .col-text").each(function(a) { a = this.getBBox().width;
            t < a && (t = a) }));
    var r = this.customSettingsValues()[epiviz.ui.charts.Visualization.CustomSettings.ROW_LABEL];
    b = this.customSettingsValues()[epiviz.plugins.charts.HeatmapPlotType.CustomSettings.SHOW_COLORS_FOR_ROW_LABELS];
    b || (a.selectAll(".row-color-label").remove(), d = a.selectAll(".row-text").data(e, function(a) { return a.id() }), d.enter().append("text").attr("class", "row-text").attr("x", 0).attr("y", 0).attr("transform", function(a, b) { return "translate(-5," + (b * g + .5 * g) + ")rotate(30)" }), d.text(function(a) { return "name" == r ? a.name() : (a = a.annotation()) && r in a ? a[r] : "<NA>" }), d.transition().duration(500).attr("x", 0).attr("y",
        0).attr("transform", function(a, b) { return "translate(-5," + (b * g + .5 * g) + ")rotate(30)" }), d.exit().remove());
    var q;
    if (b) {
        a.selectAll(".row-text").remove();
        var u = {};
        e.forEach(function(a) { a = n(a);
            u[a] = a });
        q = Object.keys(u);
        a = a.selectAll(".row-color-label").data(e, function(a) { return a.id() });
        a.enter().append("rect").attr("class", "row-color-label").attr("x", m - l.margins().sumAxis(epiviz.ui.charts.Axis.X)).attr("y", .5 * -g).attr("width", 20).attr("height", g).attr("transform", function(a, b) {
            return "translate(0," + (b * g +
                .5 * g) + ")"
        });
        a.style("fill", function(a) { a = n(a); return l.colors().getByKey(a) });
        a.transition().duration(500).attr("x", m - l.margins().sumAxis(epiviz.ui.charts.Axis.X)).attr("y", .5 * -g).attr("height", g).attr("transform", function(a, b) { return "translate(0," + (b * g + .5 * g) + ")" });
        a.exit().remove()
    }
    this._svg.selectAll(".chart-title").remove();
    this._svg.selectAll(".chart-title-color ").remove();
    m = this._svg.selectAll(".chart-title").data(["Min"].concat(this._colorLabels));
    m.enter().append("text").attr("class", "chart-title").attr("font-weight",
        "bold").attr("y", l.margins().top() - 5 - t);
    m.attr("fill", function(a, b) { return 0 == b ? "#000000" : l.colors().getByKey(a) }).text(function(a) { return a });
    var w = 0,
        v = [];
    $("#" + this.id() + " .chart-title").each(function(a) { v.push(w);
        w += this.getBBox().width + 15 });
    m.attr("x", function(a, b) { return l.margins().left() + 10 + v[b] });
    this._svg.selectAll(".chart-title-color").data(["Min"].concat(this._colorLabels)).enter().append("circle").attr("class", "chart-title-color").attr("cx", function(a, b) { return l.margins().left() + 4 + v[b] }).attr("cy",
        l.margins().top() - 9 - t).attr("r", 4).style("shape-rendering", "auto").style("stroke-width", "0").attr("fill", function(a, b) { return 0 == b ? "#ffffff" : l.colors().getByKey(a) }).style("stroke-width", function(a, b) { return b ? 0 : 1 }).style("stroke", "#000000");
    this._svg.selectAll(".row-legend").remove();
    this._svg.selectAll(".row-legend-color").remove();
    b && (m = this._svg.selectAll(".row-legend").data(q), m.enter().append("text").attr("class", "row-legend").attr("font-weight", "bold").attr("x", -20), m.attr("fill", function(a) { return l.colors().getByKey(a) }).text(function(a) { return a }).attr("transform",
        function(a, b) { return "translate(" + l.margins().left() + "," + l.margins().top() + ")" }), m.attr("y", function(a, b) { return 10 + 15 * b }), this._svg.selectAll(".row-legend-color").data(q).enter().append("rect").attr("class", "chart-title-color").attr("x", -18).attr("y", function(a, b) { return 2 + 15 * b }).attr("width", 10).attr("height", 10).style("shape-rendering", "auto").style("stroke-width", "0").attr("fill", function(a) { return l.colors().getByKey(a) }).style("stroke-width", 0).attr("transform", function(a, b) {
        return "translate(" +
            l.margins().left() + "," + l.margins().top() + ")"
    }), this._colorLabels = this._colorLabels.concat(q))
};
epiviz.plugins.charts.HeatmapPlot.prototype.colorLabels = function() { return this._colorLabels };
epiviz.plugins.charts.HeatmapPlotType = function(a) { epiviz.ui.charts.PlotType.call(this, a) };
epiviz.plugins.charts.HeatmapPlotType.prototype = epiviz.utils.mapCopy(epiviz.ui.charts.PlotType.prototype);
epiviz.plugins.charts.HeatmapPlotType.constructor = epiviz.plugins.charts.HeatmapPlotType;
epiviz.plugins.charts.HeatmapPlotType.prototype.createNew = function(a, b, c) { return new epiviz.plugins.charts.HeatmapPlot(a, b, c) };
epiviz.plugins.charts.HeatmapPlotType.prototype.typeName = function() { return "epiviz.plugins.charts.HeatmapPlot" };
epiviz.plugins.charts.HeatmapPlotType.prototype.chartName = function() { return "Heatmap" };
epiviz.plugins.charts.HeatmapPlotType.prototype.chartHtmlAttributeName = function() { return "heatmap" };
epiviz.plugins.charts.HeatmapPlotType.prototype.measurementsFilter = function() { return function(a) { return epiviz.measurements.Measurement.Type.hasValues(a.type()) } };
epiviz.plugins.charts.HeatmapPlotType.prototype.isRestrictedToSameDatasourceGroup = function() { return !0 };
epiviz.plugins.charts.HeatmapPlotType.prototype.customSettingsDefs = function() {
    var a = epiviz.ui.charts.transform.clustering.ClusteringAlgorithmFactory.instance();
    return epiviz.ui.charts.PlotType.prototype.customSettingsDefs.call(this).concat([new epiviz.ui.charts.CustomSetting(epiviz.ui.charts.Visualization.CustomSettings.COL_LABEL, epiviz.ui.charts.CustomSetting.Type.MEASUREMENTS_METADATA, "colLabel", "Columns labels"), new epiviz.ui.charts.CustomSetting(epiviz.ui.charts.Visualization.CustomSettings.ROW_LABEL,
            epiviz.ui.charts.CustomSetting.Type.MEASUREMENTS_ANNOTATION, "name", "Row labels"), new epiviz.ui.charts.CustomSetting(epiviz.plugins.charts.HeatmapPlotType.CustomSettings.SHOW_COLORS_FOR_ROW_LABELS, epiviz.ui.charts.CustomSetting.Type.BOOLEAN, !1, "Row labels as colors"), new epiviz.ui.charts.CustomSetting(epiviz.plugins.charts.HeatmapPlotType.CustomSettings.MAX_COLUMNS, epiviz.ui.charts.CustomSetting.Type.NUMBER, 40, "Max columns"), new epiviz.ui.charts.CustomSetting(epiviz.ui.charts.Visualization.CustomSettings.Y_MIN,
            epiviz.ui.charts.CustomSetting.Type.NUMBER, epiviz.ui.charts.CustomSetting.DEFAULT, "Min Value"), new epiviz.ui.charts.CustomSetting(epiviz.ui.charts.Visualization.CustomSettings.Y_MAX, epiviz.ui.charts.CustomSetting.Type.NUMBER, epiviz.ui.charts.CustomSetting.DEFAULT, "Max Value"), new epiviz.ui.charts.CustomSetting(epiviz.plugins.charts.HeatmapPlotType.CustomSettings.CLUSTER, epiviz.ui.charts.CustomSetting.Type.CATEGORICAL, "rows", "Cluster", Object.keys(epiviz.plugins.charts.HeatmapPlotType.Cluster).map(function(a) { return epiviz.plugins.charts.HeatmapPlotType.Cluster[a] })),
        new epiviz.ui.charts.CustomSetting(epiviz.plugins.charts.HeatmapPlotType.CustomSettings.CLUSTERING_ALG, epiviz.ui.charts.CustomSetting.Type.CATEGORICAL, a.algorithms()[0], "Clustering Algorithm", a.algorithms()), new epiviz.ui.charts.CustomSetting(epiviz.plugins.charts.HeatmapPlotType.CustomSettings.CLUSTERING_METRIC, epiviz.ui.charts.CustomSetting.Type.CATEGORICAL, a.metrics()[0], "Clustering Metric", a.metrics()), new epiviz.ui.charts.CustomSetting(epiviz.plugins.charts.HeatmapPlotType.CustomSettings.CLUSTERING_LINKAGE,
            epiviz.ui.charts.CustomSetting.Type.CATEGORICAL, a.linkages()[0], "Clustering Linkage", a.linkages()), new epiviz.ui.charts.CustomSetting(epiviz.plugins.charts.HeatmapPlotType.CustomSettings.SHOW_DENDROGRAM, epiviz.ui.charts.CustomSetting.Type.BOOLEAN, !0, "Show Dendrogram")
    ])
};
epiviz.plugins.charts.HeatmapPlotType.Cluster = { NONE: "none", ROWS: "rows", COLS: "columns", BOTH: "both" };
epiviz.plugins.charts.HeatmapPlotType.CustomSettings = { MAX_COLUMNS: "maxColumns", CLUSTER: "cluster", CLUSTERING_ALG: "clusteringAlg", CLUSTERING_METRIC: "clusteringMetric", CLUSTERING_LINKAGE: "clusteringLinkage", SHOW_DENDROGRAM: "showDendrogram", SHOW_COLORS_FOR_ROW_LABELS: "showColorsForRowLabels" };
epiviz.plugins.charts.LinePlot = function(a, b, c) { epiviz.ui.charts.Plot.call(this, a, b, c);
    this._initialize() };
epiviz.plugins.charts.LinePlot.prototype = epiviz.utils.mapCopy(epiviz.ui.charts.Plot.prototype);
epiviz.plugins.charts.LinePlot.constructor = epiviz.plugins.charts.LinePlot;
epiviz.plugins.charts.LinePlot.prototype._initialize = function() { epiviz.ui.charts.Plot.prototype._initialize.call(this);
    this._svg.classed("line-plot", !0) };
epiviz.plugins.charts.LinePlot.prototype. = function(a, b, c, d) {
    epiviz.ui.charts.Plot.prototype..call(this, a, b, c, d);
    b = this._lastData;
    a = this._lastRange;
    if (!b || !a) return [];
    c = epiviz.ui.charts.CustomSetting;
    var e = this.customSettingsValues()[epiviz.ui.charts.Visualization.CustomSettings.Y_MIN],
        f = this.customSettingsValues()[epiviz.ui.charts.Visualization.CustomSettings.Y_MAX],
        g = this.customSettingsValues()[epiviz.ui.charts.Visualization.CustomSettings.ROW_LABEL];
    e == c.DEFAULT && (e = null, b.measurements().forEach(function(a) {
        null !==
            a && (null === e || a.minValue() < e) && (e = a.minValue())
    }));
    f == c.DEFAULT && (f = null, b.measurements().forEach(function(a) { null !== a && (null === f || a.maxValue() > f) && (f = a.maxValue()) }));
    null === e && null === f && (e = -1, f = 1);
    null === e && (e = f - 1);
    null === f && (f = e + 1);
    d = epiviz.ui.charts.Axis;
    c = d3.scale.linear().domain([0, b.measurements().length - 1]).range([0, this.width() - this.margins().sumAxis(d.X)]);
    d = d3.scale.linear().domain([e, f]).range([this.height() - this.margins().sumAxis(d.Y), 0]);
    this._clearAxes();
    this._Axes(c, d, b.measurements().length,
        5, void 0, void 0, void 0, void 0, void 0, void 0, b.measurements().map(function(a) { return "name" == g ? a.name() : (a = a.annotation()) && g in a ? a[g] : "<NA>" }));
    var h = this._svg.selectAll(".lines");
    if (h.empty()) { var h = this._svg.append("g").attr("class", "lines items"),
            m = h.append("g").attr("class", "selected");
        h.append("g").attr("class", "hovered");
        m.append("g").attr("class", "hovered") }
    h.attr("transform", "translate(" + this.margins().left() + ", " + this.margins().top() + ")");
    return this._Lines(a, b, c, d)
};
epiviz.plugins.charts.LinePlot.prototype._Lines = function(a, b, c, d) {
    var e = this.colors(),
        f = this.customSettingsValues()[epiviz.plugins.charts.LinePlotType.CustomSettings.SHOW_POINTS],
        g = this.customSettingsValues()[epiviz.plugins.charts.LinePlotType.CustomSettings.SHOW_LINES],
        h = this.customSettingsValues()[epiviz.plugins.charts.LinePlotType.CustomSettings.SHOW_ERROR_BARS],
        m = this.customSettingsValues()[epiviz.plugins.charts.LinePlotType.CustomSettings.POINT_RADIUS],
        l = this.customSettingsValues()[epiviz.plugins.charts.LinePlotType.CustomSettings.LINE_THICKNESS],
        n = this.customSettingsValues()[epiviz.plugins.charts.LinePlotType.CustomSettings.INTERPOLATION],
        p = this.customSettingsValues()[epiviz.ui.charts.Visualization.CustomSettings.COL_LABEL],
        t = this.customSettingsValues()[epiviz.plugins.charts.LinePlotType.CustomSettings.ABS_LINE_VAL],
        r = this,
        q = this._svg.select(".lines"),
        u = b.firstSeries().globalStartIndex(),
        w = b.firstSeries().globalEndIndex();
    b.foreach(function(a, b) { var c = b.globalStartIndex(),
            d = b.globalEndIndex();
        c > u && (u = c);
        d < w && (w = d) });
    for (var v = w - u, z = epiviz.measurements.Measurement.Type.isOrdered(b.measurements()[0].type()),
            A, E, C = 0; C < v; ++C) { var B = C + u,
            G = b.firstSeries().getRowByGlobalIndex(B); if (!z || void 0 == a.start() || void 0 == a.end() || G.start() < a.end() && G.end() >= a.start()) void 0 == A && (A = B), E = B + 1 }
    u = A;
    w = E;
    v = E - A;
    this.width();
    var y = d3.svg.line().x(function(a) { return c(a.x) }).y(function(a) { return d(a.y) }).interpolate(n),
        x = function(a) { return r._globalIndexColorLabels ? r._globalIndexColorLabels[a.globalIndex()] : a.metadata(p) },
        F = function(a) {
            return b.measurements().map(function(c, d) {
                var e = b.getByGlobalIndex(c, a);
                return {
                    x: d,
                    y: e ? e.value : null,
                    errMinus: e && e.valueAnnotation ? e.valueAnnotation.errMinus : null,
                    errPlus: e && e.valueAnnotation ? e.valueAnnotation.errPlus : null
                }
            }).filter(function(a) { return null !== a.y })
        };
    a = epiviz.utils.range(v, u);
    var D;
    g ? (D = a.map(function(a) { var c = b.firstSeries().getRowByGlobalIndex(a); return new epiviz.ui.charts.ChartObject(sprintf("line-series-%s", a), c.start(), c.end(), F(a), a, b.measurements().map(function(c, d) { return [b.getByGlobalIndex(c, a)] }), b.measurements(), "") }), g = q.selectAll(".line-series").data(D, function(a) { return a.id }),
        g.enter().insert("g", ":first-child").attr("class", "line-series item").style("opacity", "0").on("mouseover", function(a) { r._hover.notify(new epiviz.ui.charts.VisEventArgs(r.id(), a)) }).on("mouseout", function() { r._unhover.notify(new epiviz.ui.charts.VisEventArgs(r.id())) }).each(function(a) {
            d3.select(this).append("path").attr("class", "bg-line").attr("d", y(a.values)).style("shape-rendering", "auto").style("stroke-width", 10).style("stroke", "#dddddd").style("stroke-opacity", "0.1");
            d3.select(this).append("path").attr("class",
                "main-line").attr("d", y(a.values)).style("shape-rendering", "auto")
        }), g.transition().duration(500).style("opacity", "0.7").each(function(a) { var c = e.getByKey(x(b.firstSeries().getRowByGlobalIndex(a.seriesIndex)));
            d3.select(this).selectAll(".bg-line").attr("d", y(a.values));
            d3.select(this).selectAll(".main-line").attr("d", y(a.values)).style("stroke", c).style("stroke-width", l) }), g.exit().transition().duration(500).style("opacity", "0").remove()) : q.selectAll(".line-series").remove();
    f ? (f = q.selectAll(".points").data(D,
        function(a) { return a.id }), f.enter().append("g").attr("class", "points").style("opacity", "0"), f.each(function(a) {
        d3.select(this).selectAll(".data-point").remove();
        var f = d3.select(this).selectAll(".data-point").data(a.values);
        f.enter().append("g").attr("class", "data-point").each(function(f) {
            d3.select(this).append("circle").attr("cx", function(a) { return c(a.x) }).attr("cy", function(a) { return d(a.y) }).attr("r", m).style("stroke-width", 2).attr("fill", "none").attr("stroke", e.getByKey(x(b.firstSeries().getRowByGlobalIndex(a.seriesIndex))));
            d3.select(this).selectAll(".error-bar").remove();
            h && void 0 != f.errMinus && void 0 != f.errPlus && (d3.select(this).append("line").attr("x1", c(f.x)).attr("x2", c(f.x)).attr("y1", d(f.errMinus)).attr("y2", d(f.errPlus)).style("stroke", e.getByKey(x(b.firstSeries().getRowByGlobalIndex(a.seriesIndex)))).style("stroke-width", 2).attr("class", "error-bar"), d3.select(this).append("line").attr("x1", c(f.x) - 4).attr("x2", c(f.x) + 4).attr("y1", d(f.errMinus)).attr("y2", d(f.errMinus)).style("stroke", e.getByKey(x(b.firstSeries().getRowByGlobalIndex(a.seriesIndex)))).style("stroke-width",
                2).attr("class", "error-bar"), d3.select(this).append("line").attr("x1", c(f.x) - 4).attr("x2", c(f.x) + 4).attr("y1", d(f.errPlus)).attr("y2", d(f.errPlus)).style("stroke", e.getByKey(x(b.firstSeries().getRowByGlobalIndex(a.seriesIndex)))).style("stroke-width", 2).attr("class", "error-bar"))
        });
        f.exit().remove()
    }).transition().duration(500).style("opacity", "1"), f.exit().transition().duration(500).style("opacity", "0").remove()) : q.selectAll(".points").remove();
    var H = {};
    a.forEach(function(a) {
        a = x(b.firstSeries().getRowByGlobalIndex(a));
        H[a] = a
    });
    this._svg.selectAll(".chart-title").remove();
    this._svg.selectAll(".chart-title-color").remove();
    f = this._svg.selectAll(".chart-title").data(Object.keys(H));
    f.enter().append("text").attr("class", "chart-title").attr("font-weight", "bold").attr("y", r.margins().top() - 5);
    f.attr("fill", function(a) { return e.getByKey(a) }).text(function(a) { return a });
    var L = 0,
        K = [];
    $("#" + this.id() + " .chart-title").each(function(a) { K.push(L);
        L += this.getBBox().width + 15 });
    f.attr("x", function(a, b) {
        return r.margins().left() +
            10 + K[b]
    });
    this._svg.selectAll(".chart-title-color").data(Object.keys(H)).enter().append("circle").attr("class", "chart-title-color").attr("cx", function(a, b) { return r.margins().left() + 4 + K[b] }).attr("cy", r.margins().top() - 9).attr("r", 4).style("shape-rendering", "auto").style("stroke-width", "0").style("fill", function(a) { return e.getByKey(a) });
    t != epiviz.ui.charts.CustomSetting.DEFAULT && (q.selectAll(".abLine").remove(), q.append("svg:line").attr("class", "abLine").attr("x1", 0).attr("x2", r.width() - r.margins().sumAxis(epiviz.ui.charts.Axis.X)).attr("y1",
        d(t)).attr("y2", d(t)).style("stroke", "black").style("stroke-dasharray", "5, 5"));
    return D
};
epiviz.plugins.charts.LinePlot.prototype.colorLabels = function() { for (var a = [], b = 0; b < this.colors().size() && 20 > b; ++b) a.push("Color " + (b + 1)); return a };
epiviz.plugins.charts.LinePlotType = function(a) { epiviz.ui.charts.PlotType.call(this, a) };
epiviz.plugins.charts.LinePlotType.prototype = epiviz.utils.mapCopy(epiviz.ui.charts.PlotType.prototype);
epiviz.plugins.charts.LinePlotType.constructor = epiviz.plugins.charts.LinePlotType;
epiviz.plugins.charts.LinePlotType.prototype.createNew = function(a, b, c) { return new epiviz.plugins.charts.LinePlot(a, b, c) };
epiviz.plugins.charts.LinePlotType.prototype.typeName = function() { return "epiviz.plugins.charts.LinePlot" };
epiviz.plugins.charts.LinePlotType.prototype.chartName = function() { return "Line Plot" };
epiviz.plugins.charts.LinePlotType.prototype.chartHtmlAttributeName = function() { return "line-plot" };
epiviz.plugins.charts.LinePlotType.prototype.measurementsFilter = function() { return function(a) { return a.type() == epiviz.measurements.Measurement.Type.FEATURE } };
epiviz.plugins.charts.LinePlotType.prototype.isRestrictedToSameDatasourceGroup = function() { return !0 };
epiviz.plugins.charts.LinePlotType.prototype.customSettingsDefs = function() {
    return epiviz.ui.charts.PlotType.prototype.customSettingsDefs.call(this).concat([new epiviz.ui.charts.CustomSetting(epiviz.ui.charts.Visualization.CustomSettings.COL_LABEL, epiviz.ui.charts.CustomSetting.Type.MEASUREMENTS_METADATA, "colLabel", "Columns labels"), new epiviz.ui.charts.CustomSetting(epiviz.ui.charts.Visualization.CustomSettings.ROW_LABEL, epiviz.ui.charts.CustomSetting.Type.MEASUREMENTS_ANNOTATION, "name", "Row labels"),
        new epiviz.ui.charts.CustomSetting(epiviz.plugins.charts.LinePlotType.CustomSettings.SHOW_POINTS, epiviz.ui.charts.CustomSetting.Type.BOOLEAN, !1, "Show points"), new epiviz.ui.charts.CustomSetting(epiviz.plugins.charts.LinePlotType.CustomSettings.SHOW_LINES, epiviz.ui.charts.CustomSetting.Type.BOOLEAN, !0, "Show lines"), new epiviz.ui.charts.CustomSetting(epiviz.plugins.charts.LinePlotType.CustomSettings.SHOW_ERROR_BARS, epiviz.ui.charts.CustomSetting.Type.BOOLEAN, !0, "Show error bars"), new epiviz.ui.charts.CustomSetting(epiviz.plugins.charts.LinePlotType.CustomSettings.POINT_RADIUS,
            epiviz.ui.charts.CustomSetting.Type.NUMBER, 4, "Point radius"), new epiviz.ui.charts.CustomSetting(epiviz.plugins.charts.LinePlotType.CustomSettings.LINE_THICKNESS, epiviz.ui.charts.CustomSetting.Type.NUMBER, 3, "Line thickness"), new epiviz.ui.charts.CustomSetting(epiviz.ui.charts.Visualization.CustomSettings.Y_MIN, epiviz.ui.charts.CustomSetting.Type.NUMBER, epiviz.ui.charts.CustomSetting.DEFAULT, "Min Y"), new epiviz.ui.charts.CustomSetting(epiviz.ui.charts.Visualization.CustomSettings.Y_MAX, epiviz.ui.charts.CustomSetting.Type.NUMBER,
            epiviz.ui.charts.CustomSetting.DEFAULT, "Max Y"), new epiviz.ui.charts.CustomSetting(epiviz.plugins.charts.LinePlotType.CustomSettings.INTERPOLATION, epiviz.ui.charts.CustomSetting.Type.CATEGORICAL, "basis", "Interpolation", "linear step-before step-after basis basis-open basis-closed bundle cardinal cardinal-open monotone".split(" ")), new epiviz.ui.charts.CustomSetting(epiviz.plugins.charts.LinePlotType.CustomSettings.ABS_LINE_VAL, epiviz.ui.charts.CustomSetting.Type.NUMBER, epiviz.ui.charts.CustomSetting.DEFAULT,
            " abline")
    ])
};
epiviz.plugins.charts.LinePlotType.CustomSettings = { SHOW_POINTS: "showPoints", SHOW_ERROR_BARS: "showErrorBars", SHOW_LINES: "showLines", POINT_RADIUS: "pointRadius", LINE_THICKNESS: "lineThickness", INTERPOLATION: "interpolation", ABS_LINE_VAL: "abLine" };
epiviz.plugins.charts.StackedLinePlot = function(a, b, c) { epiviz.ui.charts.Plot.call(this, a, b, c);
    this._initialize() };
epiviz.plugins.charts.StackedLinePlot.prototype = epiviz.utils.mapCopy(epiviz.ui.charts.Plot.prototype);
epiviz.plugins.charts.StackedLinePlot.constructor = epiviz.plugins.charts.StackedLinePlot;
epiviz.plugins.charts.StackedLinePlot.prototype._initialize = function() { epiviz.ui.charts.Plot.prototype._initialize.call(this);
    this._svg.classed("stacked-line-plot", !0) };
epiviz.plugins.charts.StackedLinePlot.prototype. = function(a, b, c, d) {
    epiviz.ui.charts.Plot.prototype..call(this, a, b, c, d);
    b = this._lastData;
    a = this._lastRange;
    if (!b || !a) return [];
    b = this.customSettingsValues()[epiviz.plugins.charts.StackedLinePlotType.CustomSettings.ROW_GROUP_BY];
    var e = this,
        f = function() {
            for (var a = 0; a < e._markers.length; a++)
                if (e._markers[a]._type == epiviz.ui.charts.markers.VisualizationMarker.Type.GROUP_BY_MEASUREMENTS) {
                    var b = e._markers[a].id();
                    delete e._markersMap[b];
                    delete e._markersIndices[b];
                    delete e._markers[a];
                    e._markers.length--
                }
        };
    a = function(a) { if (!a) return null; var b; if (a.id() in e._markersMap) { b = e._markersIndices[a.id()]; var c = e._markers[b]; if (c == a || c.type() == a.type() && c.preMarkStr() == a.preMarkStr() && c.markStr() == a.markStr()) return null;
            e._markers[b] = a } else f(), b = e._markers.length, e._markers.push(a), e._markersIndices[a.id()] = b;
        e._markersMap[a.id()] = a };
    this.customSettingsValues()[epiviz.plugins.charts.StackedLinePlotType.CustomSettings.USE_GROUP_BY] ? (b = new epiviz.ui.charts.markers.VisualizationMarker(epiviz.ui.charts.markers.VisualizationMarker.Type.GROUP_BY_MEASUREMENTS,
        null, null, "function(data){return null}", "function(m, data, preMarkResult) {return m.annotation()['" + b + "'];}"), a(b)) : f();
    (function() { e.transformData(e._lastRange, e._unalteredData).done(function() { e._Plot(e._lastRange, e._lastData, c, d) });
        e._markersModified.notify(new epiviz.ui.charts.VisEventArgs(e._id, e._markers)) })()
};
epiviz.plugins.charts.StackedLinePlot.prototype._Plot = function(a, b, c, d) {
    var e = this.customSettingsValues()[epiviz.ui.charts.Visualization.CustomSettings.ROW_LABEL];
    c = this.customSettingsValues()[epiviz.plugins.charts.StackedLinePlotType.CustomSettings.INTERPOLATION];
    d = 0 == c.indexOf("step") ? b.measurements().length : b.measurements().length - 1;
    var f = epiviz.ui.charts.Axis;
    d = d3.scale.linear().domain([0, d]).range([0, this.width() - this.margins().sumAxis(f.X)]);
    this._clearAxes();
    this._Axes(d, void 0, b.measurements().length,
        5, void 0, void 0, void 0, void 0, void 0, void 0, b.measurements().map(function(a) { return "name" == e ? a.name() : (a = a.annotation()) && e in a ? a[e] : "<NA>" }), void 0, 0 == c.indexOf("step"));
    c = this._svg.selectAll(".lines");
    c.empty() && (c = this._svg.append("g").attr("class", "lines items"), f = c.append("g").attr("class", "selected"), c.append("g").attr("class", "hovered"), f.append("g").attr("class", "hovered"));
    c.attr("transform", "translate(" + this.margins().left() + ", " + this.margins().top() + ")");
    return this._Lines(a, b, d)
};
epiviz.plugins.charts.StackedLinePlot.prototype._Lines = function(a, b, c) {
    var d = epiviz.ui.charts.Axis,
        e = this.colors(),
        f = this.customSettingsValues()[epiviz.plugins.charts.StackedLinePlotType.CustomSettings.INTERPOLATION],
        g = this.customSettingsValues()[epiviz.ui.charts.Visualization.CustomSettings.COL_LABEL],
        h = this.customSettingsValues()[epiviz.plugins.charts.StackedLinePlotType.CustomSettings.OFFSET],
        m = this.customSettingsValues()[epiviz.plugins.charts.StackedLinePlotType.CustomSettings.SCALE_TO_PERCENT],
        l = this.customSettingsValues()[epiviz.plugins.charts.StackedLinePlotType.CustomSettings.HOVER_OPACITY],
        n = this,
        p = this._svg.select(".lines"),
        t = b.firstSeries().globalStartIndex(),
        r = b.firstSeries().globalEndIndex();
    b.foreach(function(a, b) { var c = b.globalStartIndex(),
            d = b.globalEndIndex();
        c > t && (t = c);
        d < r && (r = d) });
    for (var q = r - t, u = epiviz.measurements.Measurement.Type.isOrdered(this.measurements().first().type()), w, v, z = 0; z < q; ++z) {
        var A = z + t,
            E = b.firstSeries().getRowByGlobalIndex(A);
        E && (!u || void 0 == a.start() || void 0 ==
            a.end() || E.start() < a.end() && E.end() >= a.start()) && (void 0 == w && (w = A), v = A + 1)
    }
    var t = w,
        r = v,
        C = epiviz.utils.range(v - w, t);
    if (0 == C.length) return [];
    var B = null;
    m && (B = new epiviz.measurements.MeasurementHashtable, b.measurements().forEach(function(a) { var c = C.filter(function(c) { return b.getByGlobalIndex(a, c) }).map(function(c) { return b.getByGlobalIndex(a, c).value }).reduce(function(a, b) { return a + b });
        B.put(a, c) }));
    var G = function(a) { return n._globalIndexColorLabels ? n._globalIndexColorLabels[a.globalIndex()] : a.metadata(g) },
        y = function(a) { var c = []; "step-before" == f && c.push({ x: 0, y: 0 }); var d = b.measurements(),
                c = c.concat(d.map(function(d, e) { var f = m ? B.get(d) : 1,
                        f = f || 1,
                        g = b.getByGlobalIndex(d, a); return { x: c.length + e, y: g ? g.value / f : null } })); "step-after" == f && c.push({ x: c.length, y: 0 }); return c.filter(function(a) { return null !== a.y }) };
    a = C.filter(function(a) { return b.firstSeries().getRowByGlobalIndex(a) }).map(function(a) {
        var c = b.firstSeries().getRowByGlobalIndex(a),
            d = b.measurements();
        return new epiviz.ui.charts.ChartObject(sprintf("line-series-%s",
            a), c.start(), c.end(), y(a), a, d.map(function(c, d) { return [b.getByGlobalIndex(c, a)] }), d, "")
    });
    var q = C.map(function(a) { return y(a) }),
        x = d3.layout.stack().offset(h)(q),
        F = d3.scale.linear().domain([Math.min(0, d3.min(x, function(a) { return d3.min(a, function(a) { return a.y0 + a.y }) })), d3.max(x, function(a) { return d3.max(a, function(a) { return a.y0 + a.y }) })]).range([this.height() - this.margins().sumAxis(d.Y), 0]),
        D = d3.svg.area().x(function(a) { return c(a.x) }).y0(function(a) { return F(a.y0) }).y1(function(a) {
            return F(a.y0 +
                a.y)
        }).interpolate(f),
        d = p.selectAll(".line-series").data(a, function(a) { return a.seriesIndex });
    d.enter().insert("path", ":first-child").attr("class", "line-series item").attr("d", function(a, b) { return D(x[b]) }).style("opacity", "0").style("shape-rendering", "auto").style("fill", function(a, c) { return e.getByKey(G(b.firstSeries().getRowByGlobalIndex(a.seriesIndex))) }).on("mouseover", function(a, b) {
        n._hover.notify(new epiviz.ui.charts.VisEventArgs(n.id(), a));
        p.selectAll(".item").style("opacity", 1 - l);
        p.selectAll(".hovered .item").style("opacity",
            l)
    }).on("mouseout", function() { n._unhover.notify(new epiviz.ui.charts.VisEventArgs(n.id())) });
    d.transition().duration(500).style("opacity", "0.7").attr("d", function(a, b) { return D(x[b]) }).style("fill", function(a, c) { return e.getByKey(G(b.firstSeries().getRowByGlobalIndex(a.seriesIndex))) });
    d.exit().transition().duration(500).style("opacity", "0").remove();
    var H = {};
    C.forEach(function(a) { b.firstSeries().getByGlobalIndex(a) && (a = G(b.firstSeries().getRowByGlobalIndex(a)), H[a] = a) });
    this._svg.selectAll(".chart-title").remove();
    this._svg.selectAll(".chart-title-color ").remove();
    d = this._svg.selectAll(".chart-title").data(Object.keys(H));
    d.enter().append("text").attr("class", "chart-title").attr("font-weight", "bold").attr("y", n.margins().top() - 5);
    d.attr("fill", function(a) { return e.getByKey(a) }).text(function(a) { return a });
    var L = 0,
        K = [];
    $("#" + this.id() + " .chart-title").each(function(a) { K.push(L);
        L += this.getBBox().width + 15 });
    d.attr("x", function(a, b) { return n.margins().left() + 10 + K[b] });
    this._svg.selectAll(".chart-title-color").data(Object.keys(H)).enter().append("circle").attr("class",
        "chart-title-color").attr("cx", function(a, b) { return n.margins().left() + 4 + K[b] }).attr("cy", n.margins().top() - 9).attr("r", 4).style("shape-rendering", "auto").style("stroke-width", "0").attr("fill", function(a) { return e.getByKey(a) });
    return a
};
epiviz.plugins.charts.StackedLinePlot.prototype.colorLabels = function() { for (var a = [], b = 0; b < this.colors().size() && 20 > b; ++b) a.push("Color " + (b + 1)); return a };
epiviz.plugins.charts.StackedLinePlot.prototype.doHover = function(a) {
    var b = this.customSettingsValues()[epiviz.plugins.charts.StackedLinePlotType.CustomSettings.HOVER_OPACITY],
        c = this._container.find(".items"),
        d = c.find("> .hovered"),
        e = c.find("> .selected"),
        f = e.find("> .hovered"),
        g = function() { return a.overlapsWith(d3.select(this).data()[0]) },
        c = c.find("> .item").filter(g);
    d.append(c);
    c = e.find("> .item").filter(g);
    f.append(c);
    this._svg.selectAll(".item").style("opacity", 1 - b);
    this._svg.selectAll(".hovered .item").style("opacity",
        b)
};
epiviz.plugins.charts.StackedLinePlot.prototype.doUnhover = function() { this.customSettingsValues(); var a = this._container.find(".items"),
        b = a.find("> .hovered"),
        c = a.find("> .selected"),
        d = c.find("> .hovered");
    a.prepend(b.children());
    c.prepend(d.children());
    this._svg.selectAll(".item").style("opacity", 1);
    this._svg.selectAll(".hovered .item").style("opacity", 1) };
epiviz.plugins.charts.StackedLinePlotType = function(a) { epiviz.ui.charts.PlotType.call(this, a) };
epiviz.plugins.charts.StackedLinePlotType.prototype = epiviz.utils.mapCopy(epiviz.ui.charts.PlotType.prototype);
epiviz.plugins.charts.StackedLinePlotType.constructor = epiviz.plugins.charts.StackedLinePlotType;
epiviz.plugins.charts.StackedLinePlotType.prototype.createNew = function(a, b, c) { return new epiviz.plugins.charts.StackedLinePlot(a, b, c) };
epiviz.plugins.charts.StackedLinePlotType.prototype.typeName = function() { return "epiviz.plugins.charts.StackedLinePlot" };
epiviz.plugins.charts.StackedLinePlotType.prototype.chartName = function() { return "Stacked Plot" };
epiviz.plugins.charts.StackedLinePlotType.prototype.chartHtmlAttributeName = function() { return "stacked-line-plot" };
epiviz.plugins.charts.StackedLinePlotType.prototype.measurementsFilter = function() { return function(a) { return a.type() == epiviz.measurements.Measurement.Type.FEATURE } };
epiviz.plugins.charts.StackedLinePlotType.prototype.isRestrictedToSameDatasourceGroup = function() { return !0 };
epiviz.plugins.charts.StackedLinePlotType.prototype.customSettingsDefs = function() {
    return epiviz.ui.charts.PlotType.prototype.customSettingsDefs.call(this).concat([new epiviz.ui.charts.CustomSetting(epiviz.ui.charts.Visualization.CustomSettings.COL_LABEL, epiviz.ui.charts.CustomSetting.Type.MEASUREMENTS_METADATA, "colLabel", "Color by"), new epiviz.ui.charts.CustomSetting(epiviz.ui.charts.Visualization.CustomSettings.ROW_LABEL, epiviz.ui.charts.CustomSetting.Type.MEASUREMENTS_ANNOTATION, "name", "Labels"),
        new epiviz.ui.charts.CustomSetting(epiviz.plugins.charts.StackedLinePlotType.CustomSettings.OFFSET, epiviz.ui.charts.CustomSetting.Type.CATEGORICAL, "zero", "Offset", ["zero", "wiggle"]), new epiviz.ui.charts.CustomSetting(epiviz.plugins.charts.StackedLinePlotType.CustomSettings.INTERPOLATION, epiviz.ui.charts.CustomSetting.Type.CATEGORICAL, "step-after", "Interpolation", "linear step-before step-after basis basis-open basis-closed bundle cardinal cardinal-open monotone".split(" ")), new epiviz.ui.charts.CustomSetting(epiviz.plugins.charts.StackedLinePlotType.CustomSettings.SCALE_TO_PERCENT,
            epiviz.ui.charts.CustomSetting.Type.BOOLEAN, !0, "Scale to Percent"), new epiviz.ui.charts.CustomSetting(epiviz.plugins.charts.StackedLinePlotType.CustomSettings.USE_GROUP_BY, epiviz.ui.charts.CustomSetting.Type.BOOLEAN, !1, "Use Group by"), new epiviz.ui.charts.CustomSetting(epiviz.plugins.charts.StackedLinePlotType.CustomSettings.ROW_GROUP_BY, epiviz.ui.charts.CustomSetting.Type.MEASUREMENTS_ANNOTATION, "name", "Group By"), new epiviz.ui.charts.CustomSetting(epiviz.plugins.charts.StackedLinePlotType.CustomSettings.HOVER_OPACITY,
            epiviz.ui.charts.CustomSetting.Type.NUMBER, .6, "Hover Opacity")
    ])
};
epiviz.plugins.charts.StackedLinePlotType.CustomSettings = { INTERPOLATION: "interpolation", OFFSET: "offset", SCALE_TO_PERCENT: "scaleToPercent", ROW_GROUP_BY: "groupBy", USE_GROUP_BY: "useGroupBy", HOVER_OPACITY: "hoverOpacity" };
epiviz.ui.charts.DataStructureVisualizationType = function(a) { epiviz.ui.charts.VisualizationType.call(this, a) };
epiviz.ui.charts.DataStructureVisualizationType.prototype = epiviz.utils.mapCopy(epiviz.ui.charts.VisualizationType.prototype);
epiviz.ui.charts.DataStructureVisualizationType.constructor = epiviz.ui.charts.DataStructureVisualizationType;
epiviz.ui.charts.DataStructureVisualizationType.prototype.chartDisplayType = function() { return epiviz.ui.charts.VisualizationType.DisplayType.DATA_STRUCTURE };
epiviz.ui.charts.DataStructureVisualizationType.prototype.cssClass = function() { return "data-structure-container ui-widget-content" };
epiviz.ui.charts.DataStructureVisualizationType.prototype.isRestrictedToSameDatasourceGroup = function() { return !0 };
epiviz.ui.charts.DataStructureVisualizationType.prototype.hasMeasurements = function() { return !1 };
epiviz.ui.charts.DataStructureVisualizationType.prototype.customSettingsDefs = function() { return epiviz.ui.charts.VisualizationType.prototype.customSettingsDefs.call(this) };
epiviz.ui.charts.tree = {};
epiviz.ui.charts.tree.HierarchyVisualizationType = function(a) { epiviz.ui.charts.DataStructureVisualizationType.call(this, a) };
epiviz.ui.charts.tree.HierarchyVisualizationType.prototype = epiviz.utils.mapCopy(epiviz.ui.charts.DataStructureVisualizationType.prototype);
epiviz.ui.charts.tree.HierarchyVisualizationType.constructor = epiviz.ui.charts.tree.HierarchyVisualizationType;
epiviz.ui.charts.tree.IcicleType = function(a) { epiviz.ui.charts.tree.HierarchyVisualizationType.call(this, a) };
epiviz.ui.charts.tree.IcicleType.prototype = epiviz.utils.mapCopy(epiviz.ui.charts.tree.HierarchyVisualizationType.prototype);
epiviz.ui.charts.tree.IcicleType.constructor = epiviz.ui.charts.tree.IcicleType;
epiviz.ui.charts.tree.IcicleType.prototype.createNew = function(a, b, c) { return new epiviz.ui.charts.tree.Icicle(a, b, c) };
epiviz.ui.charts.tree.IcicleType.prototype.typeName = function() { return "epiviz.ui.charts.tree.Icicle" };
epiviz.ui.charts.tree.IcicleType.prototype.chartName = function() { return "Icicle" };
epiviz.ui.charts.tree.IcicleType.prototype.chartHtmlAttributeName = function() { return "icicle" };
epiviz.ui.charts.tree.IcicleType.prototype.customSettingsDefs = function() {
    return epiviz.ui.charts.tree.HierarchyVisualizationType.prototype.customSettingsDefs.call(this).concat([new epiviz.ui.charts.CustomSetting(epiviz.ui.charts.tree.IcicleType.CustomSettings.HOVER_OPACITY, epiviz.ui.charts.CustomSetting.Type.NUMBER, .9, "Hover Opacity"), new epiviz.ui.charts.CustomSetting(epiviz.ui.charts.tree.IcicleType.CustomSettings.AGG_LEVEL, epiviz.ui.charts.CustomSetting.Type.STRING, "", "Agg Level"), new epiviz.ui.charts.CustomSetting(epiviz.ui.charts.tree.IcicleType.CustomSettings.NODE_SEL,
        epiviz.ui.charts.CustomSetting.Type.STRING, "{}", "Node Selection")])
};
epiviz.ui.charts.tree.IcicleType.CustomSettings = { HOVER_OPACITY: "hoverOpacity", AGG_LEVEL: "aggLevel", NODE_SEL: "nodeSel" };
epiviz.ui.charts.ChartIndexObject = function(a, b, c, d, e, f, g, h) { epiviz.ui.charts.VisObject.call(this);
    this.id = a;
    this.keys = b;
    this.keyValues = c;
    this.values = d;
    this.seriesIndex = g;
    this.valueItems = e;
    this.measurements = f;
    this.cssClasses = h };
epiviz.ui.charts.ChartIndexObject.prototype = epiviz.utils.mapCopy(epiviz.ui.charts.VisObject.prototype);
epiviz.ui.charts.ChartIndexObject.constructor = epiviz.ui.charts.ChartIndexObject;
epiviz.ui.charts.ChartIndexObject.prototype.getMetadata = function(a, b, c) { return this.valueItems ? this.valueItems[a][b][c] : null };
epiviz.ui.charts.ChartIndexObject.prototype.metadataColumns = function() { return this.keys };
epiviz.ui.charts.ChartIndexObject.prototype.dimensions = function() { return [1, 1] };
epiviz.plugins.charts.DiversityScatterPlot = function(a, b, c) {
    epiviz.ui.charts.Plot.call(this, a, b, c);
    this._dispatch = d3.dispatch("hover", "click");
    this._legend = this._chartContent = null;
    this._measurementsX = [];
    this._measurementsY = [];
    var d = this;
    this.measurements().foreach(function(a, b) { 0 == b % 2 ? d._measurementsX.push(a) : d._measurementsY.push(a) });
    this._yLabel = this._xLabel = "";
    for (a = 0; a < Math.min(this._measurementsX.length, this._measurementsY.length); ++a) 0 < a && (this._xLabel += ", ", this._yLabel += ", "), this._xLabel +=
        this._measurementsX[a].name(), this._yLabel += this._measurementsY[a].name();
    this._colorLabels = [];
    this._initialize()
};
epiviz.plugins.charts.DiversityScatterPlot.prototype = epiviz.utils.mapCopy(epiviz.ui.charts.Plot.prototype);
epiviz.plugins.charts.DiversityScatterPlot.constructor = epiviz.plugins.charts.DiversityScatterPlot;
epiviz.plugins.charts.DiversityScatterPlot.prototype._initialize = function() { epiviz.ui.charts.Plot.prototype._initialize.call(this);
    this._svg.classed("scatter-plot", !0);
    this._chartContent = this._svg.append("g").attr("class", "chart-content");
    this._legend = this._svg.append("g").attr("class", "chart-legend") };
epiviz.plugins.charts.DiversityScatterPlot.prototype. = function() { epiviz.ui.charts.Plot.prototype..call(this, void 0, void 0);
    this.Scatter(this._lastRange, this._lastData.data, "sample_id", this._xLabel, "alphaDiversity") };
epiviz.plugins.charts.DiversityScatterPlot.prototype.Scatter = function(a, b, c, d, e) { this.xTag = this.customSettingsValues()[epiviz.ui.charts.Visualization.CustomSettings.ROW_LABEL];
    a = this._measurementsX[0].annotation();
    this._measurementsX = [];
    a = new epiviz.measurements.Measurement(this.xTag, this.xTag, "feature", "ihmp", "ihmp", "ihmp", null, null, a, -1, 1, []);
    this._measurementsX.push(a); return this._Circles(b, this.xTag, e, c) };
epiviz.plugins.charts.DiversityScatterPlot.prototype._Circles = function(a, b, c, d) {
    function e(a) { a.sort(d3.ascending); var b = d3.quantile(a, .25);
        a = d3.quantile(a, .75); return [b, a] }
    var f = this,
        g = epiviz.ui.charts.Axis,
        h = Math.max(1, this.customSettingsValues()[epiviz.plugins.charts.DiversityScatterPlotType.CustomSettings.CIRCLE_RADIUS_RATIO] * Math.min(this.width(), this.height())),
        m = Math.max(Math.floor(h), 1),
        l = this.margins(),
        n = this.width(),
        p = this.height(),
        t = epiviz.ui.charts.CustomSetting,
        r = this.customSettingsValues()[epiviz.ui.charts.Visualization.CustomSettings.Y_MIN],
        q = this.customSettingsValues()[epiviz.ui.charts.Visualization.CustomSettings.Y_MAX],
        u = this.customSettingsValues()[epiviz.ui.charts.Visualization.CustomSettings.X_MIN],
        w = this.customSettingsValues()[epiviz.ui.charts.Visualization.CustomSettings.X_MAX];
    r == t.DEFAULT && (r = this._measurementsY[0].minValue());
    q == t.DEFAULT && (q = this._measurementsY[0].maxValue());
    var v = [];
    a.forEach(function(a) { v.push(a[b]) });
    var z = [];
    v.forEach(function(a) {-1 == z.indexOf(a) && z.push(a) });
    console.log(z);
    this.xTickValues = z;
    a.forEach(function(a) {
        var c =
            z.indexOf(a[b]);
        a._xVal = c + 1
    });
    var A = 0,
        E = [];
    z.forEach(function(a) { E[A] = [];
        E[A][0] = A;
        E[A][1] = [];
        A++ });
    a.forEach(function(a) { var d = z.indexOf(a[b]);
        E[d][1].push(a[c]) });
    u == t.DEFAULT && (u = 0);
    w == t.DEFAULT && (w = z.length + 1);
    var t = d3.scale.linear().domain([u, w]).range([0, n - l.sumAxis(g.X)]),
        C = d3.scale.linear().domain([r, q]).range([p - l.sumAxis(g.Y), 0]);
    this._clearAxes(this._chartContent);
    xLabelsPadded = [""];
    z.forEach(function(a) { xLabelsPadded.push(a) });
    console.log(xLabelsPadded);
    this._Axes(t, C, xLabelsPadded.length,
        15, this._chartContent, n, p, l, void 0, void 0, xLabelsPadded, void 0, void 0);
    for (var B = {}, G = [], y = 1, x = 0; x < a.length; ++x) {
        console.log(a[x]);
        var F = a[x]._xVal,
            D = a[x][c];
        if (F && D) {
            var H = sprintf("item data-series-%s", 0),
                L = t(F),
                K = C(D),
                L = Math.floor(L / m) * m,
                K = Math.floor(K / m) * m,
                I = null;
            B[K] && B[K][L] ? (I = B[K][L], I.id += "_" + a[x][d], I.values[0] = (I.values[0] * I.valueItems[0].length + F) / (I.valueItems[0].length + 1), I.values[1] = (I.values[1] * I.valueItems[1].length + D) / (I.valueItems[1].length + 1), I.valueItems[0].push(a[x]), I.valueItems[1].push(a[x]),
                I.valueItems[0].length > y && (y = I.valueItems[0].length)) : (I = new epiviz.ui.charts.ChartIndexObject(sprintf("scatter_%s_%s_%s_%s", F, D, 0, a[x][d]), [d], a[x][d], [F, D], [
                [a[x]],
                [a[x]]
            ], ["_xVal", c], 0, H), B[K] || (B[K] = {}), B[K][L] = I, G.push(I))
        }
    }
    console.log("after loop");
    x = this._chartContent.select(".items");
    x.empty() && (x = this._chartContent.append("g").attr("class", "items"), a = x.append("g").attr("class", "selected"), x.append("g").attr("class", "hovered"), a.append("g").attr("class", "hovered"));
    a = x.selectAll("circle").data(G,
        function(a) { return a.id });
    a.enter().insert("circle", ":first-child").attr("id", function(a) { return sprintf("%s-item-%s", f.id(), a.seriesIndex) }).style("opacity", 0).style("fill-opacity", 0).attr("r", 0);
    a.each(function(a) { var b = d3.select(this),
            c = f.colors().get(a.seriesIndex);
        b.attr("cx", l.left() + (a.values[0] - u) * (n - l.sumAxis(g.X)) / (w - u)).attr("cy", p - l.bottom() - (a.values[1] - r) * (p - l.sumAxis(g.Y)) / (q - r)).attr("class", a.cssClasses).style("fill", c) });
    a.transition().duration(1E3).style("fill-opacity", function(a) {
        return Math.max(.6,
            a.valueItems[0].length / y)
    }).style("opacity", null).attr("r", h);
    a.exit().transition().duration(1E3).style("opacity", 0).attr("r", 0).remove();
    a.on("click", function(a) { console.log("click");
        console.log(a);
        f._deselect.notify(new epiviz.ui.charts.VisEventArgs(f.id()));
        f._select.notify(new epiviz.ui.charts.VisEventArgs(f.id(), a));
        f._dispatch.click(f.id(), null);
        d3.event.stopPropagation() });
    if (this._globalIndexColorLabels) {
        h = {};
        for (j = firstGlobalIndex; j < lastGlobalIndex; ++j) h[this._globalIndexColorLabels[j]] =
            this._globalIndexColorLabels[j];
        this._colorLabels = Object.keys(h);
        this._svg.selectAll(".chart-title").remove();
        this._svg.selectAll(".chart-title-color ").remove();
        h = this._svg.selectAll(".chart-title").data(this._colorLabels);
        h.enter().append("text").attr("class", "chart-title").attr("font-weight", "bold").attr("y", f.margins().top() - 5);
        h.attr("fill", function(a, b) { return f.colors().getByKey(a) }).text(function(a) { return a });
        var J = 0,
            M = [];
        $("#" + this.id() + " .chart-title").each(function(a) {
            M.push(J);
            J += this.getBBox().width +
                15
        });
        h.attr("x", function(a, b) { return f.margins().left() + 10 + M[b] });
        this._svg.selectAll(".chart-title-color").data(this._colorLabels).enter().append("circle").attr("class", "chart-title-color").attr("cx", function(a, b) { return f.margins().left() + 4 + M[b] }).attr("cy", f.margins().top() - 9).attr("r", 4).style("shape-rendering", "auto").style("stroke-width", "0").attr("fill", function(a, b) { return f.colors().getByKey(a) }).style("stroke-width", 0)
    } else {
        h = Math.min(this._measurementsX.length, this._measurementsY.length);
        a = Array(h);
        for (j = 0; j < h; ++j) a[j] = sprintf("%s vs %s", this._measurementsX[j].name(), this._measurementsY[j].name());
        this._colorLabels = a
    }
    h = x;
    console.log(z);
    h.selectAll(".iqr-range").remove();
    h.selectAll(".whisker").remove();
    for (x = 0; x < E.length; x++) {
        a = E[x][1];
        console.log(a);
        d = [];
        d = e(a);
        console.log(d);
        m = 1.5 * (d[1] - d[0]);
        B = 0;
        F = a.length - 1;
        for (j = 0; j < a.length; j++)
            if (a[j] < d[0] - m) B = j;
            else break;
        for (k = a.length - 1; 0 < k; k--)
            if (a[k] > d[1] + m) F = k;
            else break;
        h.append("rect").attr("id", "0").attr("class", "iqr-range").style("opacity",
            1).style("fill-opacity", .2).attr("x", l.left() + (.6 + E[x][0] - u) * (n - l.sumAxis(g.X)) / (w - u)).attr("y", p - l.bottom() - (d[1] - r) * (p - l.sumAxis(g.Y)) / (q - r)).attr("width", t(.8)).attr("height", Math.abs(C(d[1]) - C(d[0]))).attr("fill", "#1E90FF");
        h.append("line").style("stroke", "gray").attr("class", "whisker").attr("x1", l.left() + (1 + E[x][0] - u) * (n - l.sumAxis(g.X)) / (w - u)).attr("y1", p - l.bottom() - (d[1] - r) * (p - l.sumAxis(g.Y)) / (q - r)).attr("x2", l.left() + (1 + E[x][0] - u) * (n - l.sumAxis(g.X)) / (w - u)).attr("y2", p - l.bottom() - (a[F] - r) * (p -
            l.sumAxis(g.Y)) / (q - r));
        h.append("line").style("stroke", "gray").attr("class", "whisker").attr("x1", l.left() + (1 + E[x][0] - u) * (n - l.sumAxis(g.X)) / (w - u)).attr("y1", p - l.bottom() - (d[0] - r) * (p - l.sumAxis(g.Y)) / (q - r)).attr("x2", l.left() + (1 + E[x][0] - u) * (n - l.sumAxis(g.X)) / (w - u)).attr("y2", p - l.bottom() - (a[B] - r) * (p - l.sumAxis(g.Y)) / (q - r));
        h.append("line").style("stroke", "gray").attr("class", "whisker").attr("x1", l.left() + (.6 + E[x][0] - u) * (n - l.sumAxis(g.X)) / (w - u)).attr("y1", p - l.bottom() - (a[F] - r) * (p - l.sumAxis(g.Y)) / (q - r)).attr("x2",
            l.left() + (1.4 + E[x][0] - u) * (n - l.sumAxis(g.X)) / (w - u)).attr("y2", p - l.bottom() - (a[F] - r) * (p - l.sumAxis(g.Y)) / (q - r));
        h.append("line").style("stroke", "gray").attr("class", "whisker").attr("x1", l.left() + (.6 + E[x][0] - u) * (n - l.sumAxis(g.X)) / (w - u)).attr("y1", p - l.bottom() - (a[B] - r) * (p - l.sumAxis(g.Y)) / (q - r)).attr("x2", l.left() + (1.4 + E[x][0] - u) * (n - l.sumAxis(g.X)) / (w - u)).attr("y2", p - l.bottom() - (a[B] - r) * (p - l.sumAxis(g.Y)) / (q - r))
    }
    return G
};
epiviz.plugins.charts.DiversityScatterPlot.prototype.colorLabels = function() { return this._colorLabels };
epiviz.plugins.charts.DiversityScatterPlot.prototype._AxesOld = function(a, b, c, d, e, f, g, h) {
    epiviz.ui.charts.Plot.prototype._Axes(a, b, c, d, e, f, g, h, void 0, void 0, this.xTickValues, void 0, void 0);
    this._legend.selectAll("text").remove();
    a = this._measurementsX;
    var m = this;
    this._legend.selectAll(".x-measurement").remove();
    this._legend.selectAll(".x-measurement-color").remove();
    b = this._legend.selectAll(".x-measurement").data(a).enter().append("text").attr("class", "x-measurement").attr("font-weight", "bold").attr("fill",
        function(a, b) { return m._globalIndexColorLabels ? "#000000" : m.colors().get(b) }).attr("y", this.height() - this.margins().bottom() + 35).text(function(a, b) { return a.name() });
    var l = 0,
        n = [];
    $("#" + this.id() + " .x-measurement").each(function(a) { n.push(l);
        l += this.getBBox().width + 15 });
    b.attr("x", function(a, b) { return .5 * (m.width() - l) + 7 + n[b] });
    this._legend.selectAll(".x-measurement-color").data(a).enter().append("circle").attr("class", "x-measurement-color").attr("cx", function(a, b) { return .5 * (m.width() - l) + 1 + n[b] }).attr("cy",
        this.height() - this.margins().bottom() + 31).attr("r", 4).style("shape-rendering", "auto").style("stroke-width", "0").style("fill", function(a, b) { return m._globalIndexColorLabels ? "#ffffff" : m.colors().get(b) });
    a = ["alphaDiversity"];
    this._legend.selectAll(".y-measurement").remove();
    this._legend.selectAll(".y-measurement-color").remove();
    b = this._legend.selectAll(".y-measurement").data(a).enter().append("text").attr("class", "y-measurement").attr("font-weight", "bold").attr("fill", function(a, b) {
        return m._globalIndexColorLabels ?
            "#000000" : m.colors().get(b)
    }).attr("y", this.margins().left() - 35).attr("transform", "rotate(-90)").text(function(a, b) { return a });
    var p = 0,
        t = [];
    $("#" + this.id() + " .y-measurement").each(function(a) { t.push(p);
        p += this.getBBox().width + 15 });
    b.attr("x", function(a, b) { return -m.height() + .5 * (m.height() - p) + 12 + m.margins().top() + t[b] });
    this._legend.selectAll(".y-measurement-color").data(a).enter().append("circle").attr("class", "y-measurement-color").attr("cx", function(a, b) {
        return -m.height() + .5 * (m.height() - p) + 6 + m.margins().top() +
            t[b]
    }).attr("cy", this.margins().left() - 39).attr("transform", "rotate(-90)").attr("r", 4).style("shape-rendering", "auto").style("stroke-width", "0").style("fill", function(a, b) { return m._globalIndexColorLabels ? "#ffffff" : m.colors().get(b) })
};
epiviz.plugins.charts.DiversityScatterPlot.prototype.transformData = function(a, b) { void 0 != a && (this._lastRange = a);
    void 0 != b && (this._unalteredData = this._lastData = b); var c = new epiviz.deferred.Deferred;
    c.resolve(); return c };
epiviz.plugins.charts.DiversityScatterPlotType = function(a) { epiviz.ui.charts.PlotType.call(this, a) };
epiviz.plugins.charts.DiversityScatterPlotType.prototype = epiviz.utils.mapCopy(epiviz.ui.charts.PlotType.prototype);
epiviz.plugins.charts.DiversityScatterPlotType.constructor = epiviz.plugins.charts.DiversityScatterPlotType;
epiviz.plugins.charts.DiversityScatterPlotType.prototype.createNew = function(a, b, c) { return new epiviz.plugins.charts.DiversityScatterPlot(a, b, c) };
epiviz.plugins.charts.DiversityScatterPlotType.prototype.typeName = function() { return "epiviz.plugins.charts.DiversityScatterPlot" };
epiviz.plugins.charts.DiversityScatterPlotType.prototype.chartName = function() { return "Diversity Scatter Plot" };
epiviz.plugins.charts.DiversityScatterPlotType.prototype.chartHtmlAttributeName = function() { return "diversity_scatter" };
epiviz.plugins.charts.DiversityScatterPlotType.prototype.measurementsFilter = function() { return function(a) { return epiviz.measurements.Measurement.Type.hasValues(a.type()) } };
epiviz.plugins.charts.DiversityScatterPlotType.prototype.isRestrictedToSameDatasourceGroup = function() { return !0 };
epiviz.plugins.charts.DiversityScatterPlotType.prototype.minSelectedMeasurements = function() { return 2 };
epiviz.plugins.charts.DiversityScatterPlotType.prototype.customSettingsDefs = function() {
    return epiviz.ui.charts.PlotType.prototype.customSettingsDefs.call(this).concat([new epiviz.ui.charts.CustomSetting(epiviz.plugins.charts.DiversityScatterPlotType.CustomSettings.CIRCLE_RADIUS_RATIO, epiviz.ui.charts.CustomSetting.Type.NUMBER, .015, "Circle radius ratio"), new epiviz.ui.charts.CustomSetting(epiviz.ui.charts.Visualization.CustomSettings.ROW_LABEL, epiviz.ui.charts.CustomSetting.Type.MEASUREMENTS_ANNOTATION,
        "name", "Row labels"), new epiviz.ui.charts.CustomSetting(epiviz.ui.charts.Visualization.CustomSettings.X_MIN, epiviz.ui.charts.CustomSetting.Type.NUMBER, epiviz.ui.charts.CustomSetting.DEFAULT, "Min X"), new epiviz.ui.charts.CustomSetting(epiviz.ui.charts.Visualization.CustomSettings.X_MAX, epiviz.ui.charts.CustomSetting.Type.NUMBER, epiviz.ui.charts.CustomSetting.DEFAULT, "Max X"), new epiviz.ui.charts.CustomSetting(epiviz.ui.charts.Visualization.CustomSettings.Y_MIN, epiviz.ui.charts.CustomSetting.Type.NUMBER,
        epiviz.ui.charts.CustomSetting.DEFAULT, "Min Y"), new epiviz.ui.charts.CustomSetting(epiviz.ui.charts.Visualization.CustomSettings.Y_MAX, epiviz.ui.charts.CustomSetting.Type.NUMBER, epiviz.ui.charts.CustomSetting.DEFAULT, "Max Y")])
};
epiviz.plugins.charts.DiversityScatterPlotType.CustomSettings = { CIRCLE_RADIUS_RATIO: "circleRadiusRatio" };
epiviz.plugins.charts.CustomScatterPlot = function(a, b, c) {
    epiviz.ui.charts.Plot.call(this, a, b, c);
    this._legend = this._chartContent = null;
    this._measurementsX = [];
    this._measurementsY = [];
    var d = this;
    this.measurements().foreach(function(a, b) { 0 == b % 2 ? d._measurementsX.push(a) : d._measurementsY.push(a) });
    this._yLabel = this._xLabel = "";
    for (a = 0; a < Math.min(this._measurementsX.length, this._measurementsY.length); ++a) 0 < a && (this._xLabel += ", ", this._yLabel += ", "), this._xLabel += this._measurementsX[a].name(), this._yLabel += this._measurementsY[a].name();
    this._colorLabels = [];
    this._initialize()
};
epiviz.plugins.charts.CustomScatterPlot.prototype = epiviz.utils.mapCopy(epiviz.ui.charts.Plot.prototype);
epiviz.plugins.charts.CustomScatterPlot.constructor = epiviz.plugins.charts.CustomScatterPlot;
epiviz.plugins.charts.CustomScatterPlot.prototype._initialize = function() { epiviz.ui.charts.Plot.prototype._initialize.call(this);
    this._svg.classed("scatter-plot", !0);
    this._chartContent = this._svg.append("g").attr("class", "chart-content");
    this._legend = this._svg.append("g").attr("class", "chart-legend") };
epiviz.plugins.charts.CustomScatterPlot.prototype. = function() { epiviz.ui.charts.Plot.prototype..call(this, void 0, void 0);
    this._variance_labels = this._lastData.pca_variance_explained;
    this.Scatter(this._lastRange, this._lastData.data, "sample_id", "PC1", "PC2") };
epiviz.plugins.charts.CustomScatterPlot.prototype.Scatter = function(a, b, c, d, e) { return this._Circles(b, d, e, c) };
epiviz.plugins.charts.CustomScatterPlot.prototype._Circles = function(a, b, c, d) {
    var e = this,
        f = epiviz.ui.charts.Axis,
        g = Math.max(1, this.customSettingsValues()[epiviz.plugins.charts.CustomScatterPlotType.CustomSettings.CIRCLE_RADIUS_RATIO] * Math.min(this.width(), this.height())),
        h = Math.max(Math.floor(g), 1),
        m = this.margins(),
        l = this.width(),
        n = this.height(),
        p = epiviz.ui.charts.CustomSetting,
        t = this.customSettingsValues()[epiviz.ui.charts.Visualization.CustomSettings.Y_MIN],
        r = this.customSettingsValues()[epiviz.ui.charts.Visualization.CustomSettings.Y_MAX],
        q = this.customSettingsValues()[epiviz.ui.charts.Visualization.CustomSettings.X_MIN],
        u = this.customSettingsValues()[epiviz.ui.charts.Visualization.CustomSettings.X_MAX],
        w = this.customSettingsValues()[epiviz.plugins.charts.CustomScatterPlotType.CustomSettings.COLOR_BY];
    q == p.DEFAULT && (q = this._measurementsX[0].minValue());
    t == p.DEFAULT && (t = this._measurementsY[0].minValue());
    u == p.DEFAULT && (u = this._measurementsX[0].maxValue());
    r == p.DEFAULT && (r = this._measurementsY[0].maxValue());
    var v = d3.scale.linear().domain([q,
            u
        ]).range([0, l - m.sumAxis(f.X)]).nice(),
        z = d3.scale.linear().domain([t, r]).range([n - m.sumAxis(f.Y), 0]).nice();
    this._clearAxes(this._chartContent);
    this._Axes(v, z, 15, 15, this._chartContent);
    for (var A = {}, p = [], E = 1, C = 0; C < a.length; ++C) {
        var B = a[C][b],
            G = a[C][c];
        if (B && G) {
            var y = sprintf("item data-series-%s", 0),
                x = v(B),
                F = z(G),
                x = Math.floor(x / h) * h,
                F = Math.floor(F / h) * h,
                D = null;
            A[F] && A[F][x] ? (D = A[F][x], D.id += "_" + a[C][d], D.values[0] = (D.values[0] * D.valueItems[0].length + B) / (D.valueItems[0].length + 1), D.values[1] = (D.values[1] *
                D.valueItems[1].length + G) / (D.valueItems[1].length + 1), D.valueItems[0].push(a[C]), D.valueItems[1].push(a[C]), D.valueItems[0].length > E && (E = D.valueItems[0].length)) : (D = new epiviz.ui.charts.ChartIndexObject(sprintf("scatter_%s_%s_%s_%s", B, G, 0, a[C][d]), [d], a[C][d], [B, G], [
                [a[C]],
                [a[C]]
            ], [b, c], 0, y), A[F] || (A[F] = {}), A[F][x] = D, p.push(D))
        }
    }
    a = this._chartContent.select(".items");
    a.empty() && (a = this._chartContent.append("g").attr("class", "items"), b = a.append("g").attr("class", "selected"), a.append("g").attr("class",
        "hovered"), b.append("g").attr("class", "hovered"));
    a = a.selectAll("circle").data(p, function(a) { return a.id });
    a.enter().insert("circle", ":first-child").attr("id", function(a) { return sprintf("%s-item-%s", e.id(), a.seriesIndex) }).style("opacity", 0).style("fill-opacity", 0).attr("r", 0);
    a.each(function(a) {
        var b = d3.select(this),
            c = e.colors().getByKey(a.valueItems[0][0][w]);
        null != e._globalIndexColorLabels && -1 == e._globalIndexColorLabels.indexOf(a.valueItems[0][0][w]) && e._globalIndexColorLabels.push(a.valueItems[0][0][w]);
        b.attr("cx", m.left() + (a.values[0] - q) * (l - m.sumAxis(f.X)) / (u - q)).attr("cy", n - m.bottom() - (a.values[1] - t) * (n - m.sumAxis(f.Y)) / (r - t)).attr("class", a.cssClasses).style("fill", c)
    });
    a.transition().duration(1E3).style("fill-opacity", function(a) { return Math.max(.6, a.valueItems[0].length / E) }).style("opacity", null).attr("r", g);
    a.exit().transition().duration(1E3).style("opacity", 0).attr("r", 0).remove();
    a.on("click", function(a) {
        console.log("click");
        e._deselect.notify(new epiviz.ui.charts.VisEventArgs(e.id()));
        e._select.notify(new epiviz.ui.charts.VisEventArgs(e.id(),
            a));
        d3.event.stopPropagation()
    });
    if (this._globalIndexColorLabels) {
        g = {};
        for (j = firstGlobalIndex; j < lastGlobalIndex; ++j) g[this._globalIndexColorLabels[j]] = this._globalIndexColorLabels[j];
        this._colorLabels = Object.keys(g);
        this._svg.selectAll(".chart-title").remove();
        this._svg.selectAll(".chart-title-color ").remove();
        g = this._svg.selectAll(".chart-title").data(this._colorLabels);
        g.enter().append("text").attr("class", "chart-title").attr("font-weight", "bold").attr("y", e.margins().top() - 5);
        g.attr("fill", function(a,
            b) { return e.colors().getByKey(a) }).text(function(a) { return a });
        var H = 0,
            L = [];
        $("#" + this.id() + " .chart-title").each(function(a) { L.push(H);
            H += this.getBBox().width + 15 });
        g.attr("x", function(a, b) { return e.margins().left() + 10 + L[b] });
        this._svg.selectAll(".chart-title-color").data(this._colorLabels).enter().append("circle").attr("class", "chart-title-color").attr("cx", function(a, b) { return e.margins().left() + 4 + L[b] }).attr("cy", e.margins().top() - 9).attr("r", 4).style("shape-rendering", "auto").style("stroke-width",
            "0").attr("fill", function(a, b) { return e.colors().getByKey(a) }).style("stroke-width", 0)
    } else { g = Math.min(this._measurementsX.length, this._measurementsY.length);
        a = Array(g); for (j = 0; j < g; ++j) a[j] = sprintf("%s vs %s", this._measurementsX[j].name(), this._measurementsY[j].name());
        this._colorLabels = a }
    this._colorLabels = [];
    Object.keys(e.colors()._keyIndices).forEach(function(a) { "undefined" != a && "Max" != a && e._colorLabels.push(a) });
    this._svg.selectAll(".chart-title").remove();
    this._svg.selectAll(".chart-title-color ").remove();
    g = this._svg.selectAll(".chart-title").data(this._colorLabels);
    g.enter().append("text").attr("class", "chart-title").attr("font-weight", "bold").attr("y", e.margins().top() - 5);
    g.attr("fill", function(a, b) { return e.colors().getByKey(a) }).text(function(a) { return a });
    H = 0;
    L = [];
    $("#" + this.id() + " .chart-title").each(function(a) { L.push(H);
        H += this.getBBox().width + 15 });
    g.attr("x", function(a, b) { return e.margins().left() + 10 + L[b] });
    this._svg.selectAll(".chart-title-color").data(this._colorLabels).enter().append("circle").attr("class",
        "chart-title-color").attr("cx", function(a, b) { return e.margins().left() + 4 + L[b] }).attr("cy", e.margins().top() - 9).attr("r", 4).style("shape-rendering", "auto").style("stroke-width", "0").attr("fill", function(a, b) { return e.colors().getByKey(a) }).style("stroke-width", 0);
    return p
};
epiviz.plugins.charts.CustomScatterPlot.prototype.colorLabels = function() { return this._colorLabels };
epiviz.plugins.charts.CustomScatterPlot.prototype._Axes = function(a, b, c, d, e, f, g, h) {
    epiviz.ui.charts.Plot.prototype._Axes.call(this, a, b, c, d, e, f, g, h);
    var m = this;
    this._legend.selectAll("text").remove();
    m = this;
    this._legend.selectAll(".x-measurement").remove();
    this._legend.selectAll(".x-measurement-color").remove();
    a = this._legend.selectAll(".x-measurement").data(["pca1"]).enter().append("text").attr("class", "x-measurement").attr("font-weight", "bold").attr("fill", function(a, b) {
        return m._globalIndexColorLabels ?
            "#000000" : m.colors().get(b)
    }).attr("y", this.height() - this.margins().bottom() + 35).text(function(a, b) { return a + " (% Variance Explained = " + m._variance_labels[0] + ")" });
    var l = 0,
        n = [];
    $("#" + this.id() + " .x-measurement").each(function(a) { n.push(l);
        l += this.getBBox().width + 15 });
    a.attr("x", function(a, b) { return .5 * (m.width() - l) + 7 + n[b] });
    this._legend.selectAll(".y-measurement").remove();
    this._legend.selectAll(".y-measurement-color").remove();
    a = this._legend.selectAll(".y-measurement").data(["pca2"]).enter().append("text").attr("class",
        "y-measurement").attr("font-weight", "bold").attr("fill", function(a, b) { return m._globalIndexColorLabels ? "#000000" : m.colors().get(b) }).attr("y", this.margins().left() - 35).attr("transform", "rotate(-90)").text(function(a, b) { return a + " (% Variance Explained = " + m._variance_labels[1] + ")" });
    var p = 0,
        t = [];
    $("#" + this.id() + " .y-measurement").each(function(a) { t.push(p);
        p += this.getBBox().width + 15 });
    a.attr("x", function(a, b) { return -m.height() + .5 * (m.height() - p) + 12 + m.margins().top() + t[b] })
};
epiviz.plugins.charts.CustomScatterPlot.prototype.transformData = function(a, b) { void 0 != a && (this._lastRange = a);
    void 0 != b && (this._unalteredData = this._lastData = b); var c = new epiviz.deferred.Deferred;
    c.resolve(); return c };
epiviz.plugins.charts.CustomScatterPlotType = function(a) { epiviz.ui.charts.PlotType.call(this, a) };
epiviz.plugins.charts.CustomScatterPlotType.prototype = epiviz.utils.mapCopy(epiviz.ui.charts.PlotType.prototype);
epiviz.plugins.charts.CustomScatterPlotType.constructor = epiviz.plugins.charts.CustomScatterPlotType;
epiviz.plugins.charts.CustomScatterPlotType.prototype.createNew = function(a, b, c) { return new epiviz.plugins.charts.CustomScatterPlot(a, b, c) };
epiviz.plugins.charts.CustomScatterPlotType.prototype.typeName = function() { return "epiviz.plugins.charts.CustomScatterPlot" };
epiviz.plugins.charts.CustomScatterPlotType.prototype.chartName = function() { return "PCA Scatter Plot" };
epiviz.plugins.charts.CustomScatterPlotType.prototype.chartHtmlAttributeName = function() { return "pca_scatter" };
epiviz.plugins.charts.CustomScatterPlotType.prototype.measurementsFilter = function() { return function(a) { return epiviz.measurements.Measurement.Type.hasValues(a.type()) } };
epiviz.plugins.charts.CustomScatterPlotType.prototype.isRestrictedToSameDatasourceGroup = function() { return !0 };
epiviz.plugins.charts.CustomScatterPlotType.prototype.minSelectedMeasurements = function() { return 2 };
epiviz.plugins.charts.CustomScatterPlotType.prototype.customSettingsDefs = function() {
    return epiviz.ui.charts.PlotType.prototype.customSettingsDefs.call(this).concat([new epiviz.ui.charts.CustomSetting(epiviz.plugins.charts.CustomScatterPlotType.CustomSettings.CIRCLE_RADIUS_RATIO, epiviz.ui.charts.CustomSetting.Type.NUMBER, .015, "Circle radius ratio"), new epiviz.ui.charts.CustomSetting(epiviz.ui.charts.Visualization.CustomSettings.X_MIN, epiviz.ui.charts.CustomSetting.Type.NUMBER, epiviz.ui.charts.CustomSetting.DEFAULT,
        "Min X"), new epiviz.ui.charts.CustomSetting(epiviz.ui.charts.Visualization.CustomSettings.X_MAX, epiviz.ui.charts.CustomSetting.Type.NUMBER, epiviz.ui.charts.CustomSetting.DEFAULT, "Max X"), new epiviz.ui.charts.CustomSetting(epiviz.ui.charts.Visualization.CustomSettings.Y_MIN, epiviz.ui.charts.CustomSetting.Type.NUMBER, epiviz.ui.charts.CustomSetting.DEFAULT, "Min Y"), new epiviz.ui.charts.CustomSetting(epiviz.ui.charts.Visualization.CustomSettings.Y_MAX, epiviz.ui.charts.CustomSetting.Type.NUMBER, epiviz.ui.charts.CustomSetting.DEFAULT,
        "Max Y"), new epiviz.ui.charts.CustomSetting(epiviz.plugins.charts.CustomScatterPlotType.CustomSettings.COLOR_BY, epiviz.ui.charts.CustomSetting.Type.MEASUREMENTS_ANNOTATION, "name", "Color By")])
};
epiviz.plugins.charts.CustomScatterPlotType.CustomSettings = { CIRCLE_RADIUS_RATIO: "circleRadiusRatio", COLOR_BY: "colorBy" };
epiviz.ui.charts.ChartFactory = function(a) { this._config = a;
    this._types = {}; for (var b = this._size = 0; b < a.chartTypes.length; ++b) this.register(a.chartTypes[b]) };
epiviz.ui.charts.ChartFactory.prototype.size = function() { return this._size };
epiviz.ui.charts.ChartFactory.prototype.registerType = function(a) { a.typeName() in this._types || ++this._size;
    this._types[a.typeName()] = a };
epiviz.ui.charts.ChartFactory.prototype.unregisterType = function(a) { if (!(a.typeName() in this._types)) return !1;--this._size;
    delete this._types[a.typeName()]; return !0 };
epiviz.ui.charts.ChartFactory.prototype.register = function(a) { a = epiviz.utils.evaluateFullyQualifiedTypeName(a); if (!a) return !1;
    this.registerType(new a(this._config)); return !0 };
epiviz.ui.charts.ChartFactory.prototype.unregister = function(a) { return (a = epiviz.utils.evaluateFullyQualifiedTypeName(a)) ? this.unregisterType(new a(this._config)) : !1 };
epiviz.ui.charts.ChartFactory.prototype.get = function(a) { return a && a in this._types ? this._types[a] : null };
epiviz.ui.charts.ChartFactory.prototype.foreach = function(a) { for (var b in this._types)
        if (this._types.hasOwnProperty(b) && a(b, this._types[b])) break };
epiviz.ui.controls.Control = function(a, b, c) { this._container = a;
    this._title = b || "";
    this._id = c || epiviz.utils.generatePseudoGUID(6) };
epiviz.ui.controls.Control.prototype.initialize = function() {};
epiviz.ui.controls.Control.prototype.id = function() { return this._id };
epiviz.ui.controls.Control.prototype.title = function() { return this._title };
epiviz.ui.controls.DataTable = function(a, b, c, d, e, f) { epiviz.ui.controls.Control.call(this, a);
    this._columns = b;
    this._rows = c;
    this._rowsArray = []; var g = this;
    this._rows.foreach(function(a) { g._rowsArray.push(a) });
    this._rowParser = d;
    this._multiselect = e || !1;
    this._showColumnSelector = f || !1;
    this._columnSelector = this._table = null;
    this._selectedIndices = [];
    this._selectedIndicesMap = {};
    this._lastSelection = this._deselectList = this._selectList = null };
epiviz.ui.controls.DataTable.prototype = epiviz.utils.mapCopy(epiviz.ui.controls.Control.prototype);
epiviz.ui.controls.DataTable.constructor = epiviz.ui.controls.DataTable;
epiviz.ui.controls.DataTable.ColumnType = { STRING: "string", NUMBER: "number", BOOLEAN: "boolean" };
epiviz.ui.controls.DataTable.prototype.initialize = function() {
    this._container.append('<div class="epiviz-data-table"><table style="width: 100%!important;"><thead></thead><tbody></tbody><tfoot></tfoot></table></div>');
    this._table = this._container.find("table");
    var a = this._table.find("thead"),
        b = this._table.find("tfoot"),
        c = this._table.find("tbody"),
        d = sprintf("<tr><th>%s</th></tr>", this._columns.join("</th><th>"));
    a.append(d);
    b.append(d);
    var e = this;
    this._rows.foreach(function(a) {
        for (var b = "", d = 0; d < e._columns.length; ++d) b +=
            sprintf("<td>%s</td>", e._rowParser(a, e._columns[d]));
        c.append(sprintf("<tr>%s</tr>", b))
    });
    b = Array(this._columns.length);
    for (a = 0; a < this._columns.length; ++a) b[a] = { type: "text", bRegex: !0, bSmart: !0 };
    this._table.dataTable({
        bJQueryUI: !0,
        sDom: '<"H"lfr>Tt<"F"ip>',
        oTableTools: {
            sRowSelect: this._multiselect ? "multi" : "single",
            aButtons: ["select_all"],
            fnPreRowSelect: function(a, b, c) { return e._preRowSelect(this, a, b, c) },
            fnRowSelected: function(a) { return e._select(this, a) },
            fnRowDeselected: function(a) {
                return e._select(this,
                    a)
            }
        }
    }).columnFilter({ aoColumns: b });
    b = -1;
    for (a = 0; a < this._columns.length; ++a) this._columns[a].isVisible && ++b, this._table.fnSetColumnVis(a, this._columns[a].isVisible), this._columns[a].defaultFilter && (this._table.fnFilter(this._columns[a].defaultFilter, a, !0, !0), this._table.find("tfoot").find(sprintf("th:eq(%s)", b)).find("input").removeClass("search_init").val(this._columns[a].defaultFilter));
    this._container.find(".ui-buttonset").first().attr("style", "position: absolute!important;");
    if (this._showColumnSelector) {
        this._container.find(".fg-toolbar").first().append(sprintf('<div style="float: right; margin-right: 5px;"><label>Selected Columns: </label><select class="%s" multiple="multiple" style=""><option value="-1">All</option></select></div>',
            "epiviz-data-table-column-selector"));
        this._columnSelector = this._container.find(".epiviz-data-table-column-selector");
        for (a = 0; a < this._columns.length; ++a) b = sprintf('<option value="%s"%s%s>%s</option>', a, this._columns[a].isVisible ? ' selected="selected"' : "", this._columns[a].isFixed ? ' disabled="disabled"' : "", this._columns[a].name), this._columnSelector.append(b);
        this._columnSelector.dropdownchecklist({ width: "80px", firstItemChecksAll: !0, onComplete: function(a) { e._selectColumns(a) } })
    }
};
epiviz.ui.controls.DataTable.prototype.selectedIndices = function() { return this._selectedIndices || [] };
epiviz.ui.controls.DataTable.prototype.selectedRows = function() { if (!this._selectedIndices) return []; for (var a = Array(this._selectedIndices.length), b = 0; b < this._selectedIndices.length; ++b) a[b] = this._rowsArray[this._selectedIndices[b]]; return a };
epiviz.ui.controls.DataTable.prototype._preRowSelect = function(a, b, c, d) { b && (this._selectList = this._deselectList = null, b.shiftKey && 1 == c.length ? (this._deselectList = a.fnGetSelected(), this._lastSelection || (this._lastSelection = c[0]), this._selectList = this._getRangeOfRows(this._lastSelection, c[0])) : (this._lastSelection = c[0], b.ctrlKey || b.metaKey || (this._deselectList = a.fnGetSelected(), d || (this._selectList = c)))); return !0 };
epiviz.ui.controls.DataTable.prototype._getRangeOfRows = function(a, b) { var c = this._table.fnGetPosition(a),
        d = this._table.fnGetPosition(b),
        e = this._table.fnSettings(),
        c = $.inArray(c, e.aiDisplay),
        d = $.inArray(d, e.aiDisplay),
        f = []; if (0 <= c && 0 <= d)
        for (var g = Math.min(c, d); g <= Math.max(c, d); ++g) f.push(e.aoData[e.aiDisplay[g]].nTr); return 0 < f.length ? f : null };
epiviz.ui.controls.DataTable.prototype._select = function(a, b) {
    var c;
    this._deselectList && (c = this._deselectList, this._deselectList = null, a.fnDeselect(c));
    this._selectList && (c = this._selectList, !this._multiselect && 0 < c.length && (c = [c[c.length - 1]]), this._selectList = null, a.fnSelect(c));
    c = a.fnGetSelected();
    var d = Array(c.length),
        e = {},
        f;
    for (f = 0; f < c.length; ++f) d[f] = this._table.fnGetPosition(c[f]), e[d[f]] = !0;
    for (f = 0; f < this._selectedIndices.length; ++f) e[this._selectedIndices[f]] || (delete this._selectedIndicesMap[this._selectedIndices[f]],
        this._selectedIndices.splice(f, 1), --f);
    for (f = 0; f < d.length; ++f) this._selectedIndicesMap[d[f]] || (this._selectedIndicesMap[d[f]] = !0, this._selectedIndices.push(d[f]));
    return !0
};
epiviz.ui.controls.DataTable.prototype._selectColumns = function(a) { var b = {},
        c; for (c = 0; c < a.options.length; ++c) a.options[c].selected && a.options[c].value && (b[parseInt(a.options[c].value)] = !0); for (c = 0; c < this._columns.length; ++c) this._table.fnSetColumnVis(c, b[c] || this._columns[c].isFixed) };
epiviz.ui.controls.DataTable.Column = function(a, b, c, d, e, f) { this.id = a;
    this.name = b;
    this.type = c;
    this.isVisible = !d;
    this.isFixed = e || !1;
    this.defaultFilter = f || "" };
epiviz.ui.controls.DataTable.Column.prototype.toString = function() { return this.name };
epiviz.utils.IterableArray = function(a) { this._array = a };
epiviz.utils.IterableArray.prototype.foreach = function(a) { for (var b = 0; b < this._array.length && !a(this._array[b]); ++b); };
epiviz.ui.controls.DatasourceGroupWizardStep = function() { this._data = this._dataTable = null };
epiviz.ui.controls.DatasourceGroupWizardStep.prototype.initialize = function(a, b) {
    this._data = b;
    a.find(".epiviz-data-table").remove();
    var c = [new epiviz.ui.controls.DataTable.Column("datasourceGroup", "Data Source Group", epiviz.ui.controls.DataTable.ColumnType.STRING)],
        d = {};
    b.measurements.foreach(function(a) {
        if (!b.dataprovider || b.dataprovider == a.dataprovider()) {
            if (b.annotation)
                for (var c in b.annotation)
                    if (b.annotation.hasOwnProperty(c) && (!a.annotation() || a.annotation()[c] != b.annotation[c])) return;
            d[a.datasourceGroup()] = !0
        }
    });
    this._dataTable = new epiviz.ui.controls.DataTable(a, c, new epiviz.utils.IterableArray(Object.keys(d)), function(a) { return a });
    this._dataTable.initialize()
};
epiviz.ui.controls.DatasourceGroupWizardStep.prototype.next = function() {
    var a = this._dataTable ? this._dataTable.selectedRows() : [];
    if (0 == a.length) return { error: "No rows selected" };
    this._data.datasourceGroup = a[0];
    return {
        data: new epiviz.ui.controls.VisConfigSelection(this._data.measurements.subset(function(b) { return b.datasourceGroup() == a[0] }), this._data.datasource, this._data.datasourceGroup, this._data.dataprovider, this._data.annotation ? epiviz.utils.mapCopy(this._data.annotation) : this._data.annotation, this._data.defaultChartType,
            this._data.minSelectedMeasurements, this._data.customData)
    }
};
epiviz.ui.controls.DatasourceGroupWizardStep.prototype.title = function() { return "Select Datasource Group" };
epiviz.ui.controls.MeaurementsWizardStep = function() { this._measurements = this._data = this._dataTable = null };
epiviz.ui.controls.MeaurementsWizardStep.prototype.initialize = function(a, b) {
    this._data = b;
    a.find(".epiviz-data-table").remove();
    var c = 2,
        d = epiviz.ui.controls.DataTable.ColumnType,
        e = [new epiviz.ui.controls.DataTable.Column("id", "Id", d.STRING, !0), new epiviz.ui.controls.DataTable.Column("name", "Name", d.STRING, !1, !0), new epiviz.ui.controls.DataTable.Column("type", "Type", d.STRING, !0), new epiviz.ui.controls.DataTable.Column("datasourceId", "Data Source", d.STRING, !0), new epiviz.ui.controls.DataTable.Column("datasourceGroup",
            "Data Source Group", d.STRING, !0), new epiviz.ui.controls.DataTable.Column("dataprovider", "Data Provider", d.STRING, !0), new epiviz.ui.controls.DataTable.Column("formulaStr", "Formula", d.STRING, !0)],
        f = [],
        g = {};
    b.measurements.foreach(function(a) { a = a.annotation(); if (void 0 != a)
            for (var b in a) !a.hasOwnProperty(b) || b in g || (f.push(b), g[b] = !0) });
    f.sort();
    e = e.concat(f.map(function(a) { var b = !1;
        0 >= c && (b = !0);
        c--; return new epiviz.ui.controls.DataTable.Column("[anno] " + a, a, d.STRING, b) }));
    this._measurements = b.measurements.subset(function(a) {
        if (b.datasource &&
            b.datasource != a.datasourceId() || b.datasourceGroup && b.datasourceGroup != a.datasourceGroup() || b.dataprovider && b.dataprovider != a.dataprovider()) return !1;
        if (b.annotation)
            for (var c in b.annotation)
                if (b.annotation.hasOwnProperty(c) && (!a.annotation() || a.annotation()[c] != b.annotation[c])) return !1;
        return !0
    });
    this._dataTable = new epiviz.ui.controls.DataTable(a, e, this._measurements, function(a, b) {
        var c;
        if (epiviz.utils.stringStartsWith(b.id, "[anno] ")) c = "", void 0 != a.annotation() && (c = a.annotation()[b.name] || "");
        else switch (b.id) {
            case "annotation":
                c = epiviz.utils.mapJoin(a.annotation(), ": ", "<br />"); break;
            default:
                c = a[b.id]() }
        return 0 === c || c ? c : ""
    }, !0, !0);
    this._dataTable.initialize()
};
epiviz.ui.controls.MeaurementsWizardStep.prototype.next = function() { var a = this._dataTable ? this._dataTable.selectedRows() : []; if (a.length < this._data.minSelectedMeasurements) return { error: "Minimum selected rows required is " + this._data.minSelectedMeasurements }; for (var b = new epiviz.measurements.MeasurementSet, c = 0; c < a.length; ++c) b.add(a[c]);
    this._data.measurements = b; return { data: this._data } };
epiviz.ui.controls.MeaurementsWizardStep.prototype.title = function() { return "Select Measurements" };
epiviz.ui.controls.Wizard = function(a, b, c, d, e, f, g) { epiviz.ui.controls.Dialog.call(this, a, b);
    this._steps = c;
    this._initialData = d;
    this._width = e;
    this._height = f;
    this._showTabs = g || !1;
    this._tabs = null;
    this._initialize() };
epiviz.ui.controls.Wizard.prototype = epiviz.utils.mapCopy(epiviz.ui.controls.Dialog.prototype);
epiviz.ui.controls.Wizard.constructor = epiviz.ui.controls.Wizard;
epiviz.ui.controls.Wizard.prototype._initialize = function() {
    var a = this;
    this._dialog = $("#" + this._id);
    this._dialog.append('<div id="wizardDialog" class="wizard-dialog"><div class="wizard-tabs"><ul class="wizard-tabs-title-list"></ul></div></div>');
    this._tabs = this._dialog.find(".wizard-tabs");
    for (var b = this._tabs.find(".wizard-tabs-title-list"), c = 0; c < this._steps.length; ++c) b.append(sprintf('<li><a href="#%s-tab-%s">%s</a></li>', this._id, c, this._steps[c].title())), this._tabs.append(sprintf('<div id="%s-tab-%s"></div>',
        this._id, c));
    this._showTabs || (b.css("visibility", "hidden"), b.css("position", "absolute"));
    this._tabs.tabs({ activate: function(b, c) { a._tabActivate(c) }, disabled: epiviz.utils.range(this._steps.length - 1, 1) });
    this._dialog.dialog({
        autoOpen: !1,
        resizable: !0,
        width: this._width || void 0,
        height: this._height || void 0,
        buttons: {
            Back: function() { var b = a._tabs.tabs("option", "active");
                0 != b && (a._tabs.tabs("option", "disabled", epiviz.utils.range(a._steps.length - b, b)), a._tabs.tabs("option", "active", b - 1)) },
            Next: function() {
                var b =
                    a._tabs.tabs("option", "active"),
                    c = a._steps[b].next();
                c.error ? (new epiviz.ui.controls.MessageDialog("Error", { Ok: function() {} }, c.error, epiviz.ui.controls.MessageDialog.Icon.ERROR)).show() : (a._steps[b + 1].initialize($(sprintf("#%s-tab-%s", a._id, b + 1)), c.data), a._tabs.tabs("option", "disabled", epiviz.utils.range(a._steps.length - b - 2, b + 2)), a._tabs.tabs("option", "active", b + 1))
            },
            Finish: function() {
                var b = a._steps[a._steps.length - 1].next();
                b.error ? (new epiviz.ui.controls.MessageDialog("Error", { Ok: function() {} },
                    b.error, epiviz.ui.controls.MessageDialog.Icon.ERROR)).show() : (a._handlers.finish && a._handlers.finish(b.data), $(this).dialog("close"))
            },
            Cancel: function() { a._handlers.close && a._handlers.close();
                $(this).dialog("close") }
        },
        modal: !0
    });
    1 < this._steps.length ? (this._dialog.parent().find('button:contains("Finish")').button("disable"), this._dialog.parent().find('button:contains("Next")').button("enable")) : (this._dialog.parent().find('button:contains("Finish")').button("enable"), this._dialog.parent().find('button:contains("Next")').button("disable"));
    this._steps[0].initialize($(sprintf("#%s-tab-0", a._id)), this._initialData);
    this._dialog.css("overflow", "visible")
};
epiviz.ui.controls.Wizard.prototype._tabActivate = function(a) { a = this._tabs.tabs("option", "active"); var b = this._dialog.parent().find('button:contains("Finish")'),
        c = this._dialog.parent().find('button:contains("Next")');
    a == this._steps.length - 1 ? (c.button("disable"), b.button("enable")) : (c.button("enable"), b.button("disable"));
    this._tabs.tabs("option", "disabled", epiviz.utils.range(this._steps.length - a - 1, a + 1)) };
epiviz.ui.controls.Wizard.prototype.show = function() { var a = this;
    this._dialog.dialog("open");
    this._dialog.dialog("option", "position", "center");
    this._dialog.dialog({ close: function(b, c) { $(this).remove();
            a._dialog = null } }) };
epiviz.ui.controls.Wizard.Step = function() {};
epiviz.ui.controls.Wizard.Step.prototype.initialize = function(a, b) {};
epiviz.ui.controls.Wizard.Step.prototype.next = function() {};
epiviz.ui.controls.Wizard.Step.prototype.title = function() {};
epiviz.ui.controls.ComputedMeasurementsDialog = function(a, b, c, d) {
    epiviz.ui.controls.Dialog.call(this, a, b);
    this._measurements = c;
    this._chartsMeasurements = d;
    this._measurementsList = this._maxTextBox = this._minTextBox = this._nameTextBox = this._idTextBox = this._expressionTextBox = null;
    this._addButtonProperties = { text: !1, icons: { primary: "ui-icon ui-icon-plus" } };
    this._deleteButtonsProperties = { text: !1, icons: { primary: "ui-icon ui-icon-trash" } };
    this._datasourceGroupMeasurements = this._selectedDatasourceGroup = this._tabs =
        null;
    this._addTabs();
    this._addDialogContents();
    this._addDatasourceGroupTable(c)
};
epiviz.ui.controls.ComputedMeasurementsDialog.prototype = epiviz.utils.mapCopy(epiviz.ui.controls.Dialog.prototype);
epiviz.ui.controls.ComputedMeasurementsDialog.constructor = epiviz.ui.controls.ComputedMeasurementsDialog;
epiviz.ui.controls.ComputedMeasurementsDialog.prototype.show = function() { epiviz.ui.controls.Dialog.prototype.show.call(this); var a = this;
    this._dialog && (this._dialog.dialog("open"), this._dialog.dialog("option", "position", "center"), this._dialog.dialog({ close: function(b, c) { $(this).remove();
            a._dialog = null;
            a._handlers.close() } })) };
epiviz.ui.controls.ComputedMeasurementsDialog.prototype._addDatasourceGroupTable = function(a) {
    var b = this,
        c = $(sprintf("#datasource-group-tab-%s", this._id)),
        d = "",
        e = {};
    a.foreach(function(a) { a.type() == epiviz.measurements.Measurement.Type.FEATURE && (a.datasourceGroup() in e || (e[a.datasourceGroup()] = []), e[a.datasourceGroup()].push(a)) });
    for (var f in e) e.hasOwnProperty(f) && (d += sprintf('<tr><td class="center">%s</td></tr>', f));
    c.append(sprintf('<table style="border-spacing:0; border-collapse:collapse; -webkit-touch-callout: none; -webkit-user-select: none; -khtml-user-select: none; -moz-user-select: moz-none; -ms-user-select: none; user-select: none; width: 100%%;" class="computed-measurements-dialog-raw-table">%s</table>',
        "<thead><tr><th>Data Source Group</th></tr></thead>" + d + "<tfoot><tr><th>Data Source Group</th></tr></tfoot>"));
    var g = c.find(".computed-measurements-dialog-raw-table").dataTable({
        bJQueryUI: !0,
        sDom: '<"H"lfr>Tt<"F"ip>',
        oTableTools: {
            sRowSelect: "single",
            aButtons: [],
            fnPreRowSelect: function(a, b, c) { return !0 },
            fnRowSelected: function(a) { a = g.fnGetData(a[0]);
                b._selectedDatasourceGroup = a[0];
                b._datasourceGroupMeasurements = e[b._selectedDatasourceGroup] },
            fnRowDeselected: function(a) {
                g.fnGetData(a[0]) == b._selectedDatasourceGroup &&
                    (b._selectedDatasourceGroup = null, b._datasourceGroupMeasurements = null)
            }
        }
    });
    c.find(".DTTT_container").css("position", "absolute")
};
epiviz.ui.controls.ComputedMeasurementsDialog.prototype._addTabs = function() {
    var a = this;
    this._selectDialog().append('<div id="computedMeasurementsDialog" class="computed-measurements-dialog"><div class="computed-measurements-tabs"><ul>' + sprintf('<li><a href="#datasource-group-tab-%s">Data Source Group</a></li>', this._id) + sprintf('<li><a href="#formula-tab-%s">Expression</a></li>', this._id) + "</ul>" + sprintf('<div id="datasource-group-tab-%s"></div>', this._id) + sprintf('<div id="formula-tab-%s"></div>',
        this._id) + "</div></div>");
    this._tabs = this._selectTabs();
    this._tabs.tabs({ activate: function(b, c) { a._tabActivate(c) } })
};
epiviz.ui.controls.ComputedMeasurementsDialog.prototype._addDialogContents = function() {
    var a = this;
    this._selectDialog().dialog({
        autoOpen: !1,
        resizable: !0,
        width: "600",
        height: "550",
        buttons: {
            Back: function() { 0 != a._tabs.tabs("option", "active") && a._tabs.tabs("option", "active", 0) },
            Next: function() { 1 != a._tabs.tabs("option", "active") && a._tabs.tabs("option", "active", 1) },
            Add: function() {
                for (var b = epiviz.utils.ExpressionParser.parse(a._selectExpressionTextBox().val().trim()), c = {}, d = b.variables(), e = null, f = null, g = [],
                        h = {}, m = 0; m < d.length; ++m) { var l = d[m]; if (epiviz.utils.stringStartsWith(l, "{") && epiviz.utils.stringEndsWith(l, "}")) { var n = parseInt(l.substring(1, l.length - 1)),
                            l = a._datasourceGroupMeasurements[n];
                        c[n] = l; if (null === e || e > l.minValue()) e = l.minValue(); if (null === f || f < l.maxValue()) f = l.maxValue(); if (l.metadata())
                            for (n = 0; n < l.metadata().length; ++n) h[l.metadata()[n]] || (h[l.metadata()[n]] = !0, g.push(l.metadata()[n])) } }
                d = a._selectMinTextBox().val().trim();
                h = a._selectMaxTextBox().val().trim();
                e = d ? parseFloat(d) : e;
                f = h ?
                    parseFloat(h) : f;
                d = a._selectIdTextBox().val().trim() || epiviz.utils.generatePseudoGUID(5);
                b = new epiviz.measurements.Measurement(d, a._selectNameTextBox().val().trim() || "Unnamed [" + d + "]", epiviz.measurements.Measurement.Type.FEATURE, null, a._selectedDatasourceGroup, null, { referredMeasurements: c, expression: b }, "any", null, e, f, g);
                c = a._datasourceGroupMeasurements.length;
                $(sprintf("#computed-measurement-measurements-%s", a._id)).append(sprintf('<div style="min-height: 30px; padding: 2px;"><div style="margin: 6px; float: left;">%1$s {<b>%2$s</b>}</div><div style="float: right;"><button id="delete-button-%2$s-%3$s" data-measurement="%2$s">Delete</button><button style="" id="measurement-button-%2$s-%3$s" data-measurement="%2$s">Insert %2$s</button></div></div>',
                    b.name(), c, a._id));
                $("#measurement-button-" + c + "-" + a._id).button(a._addButtonProperties).click(function() { a._addButtonClick($(this)) });
                $("#delete-button-" + c + "-" + a._id).button(a._deleteButtonsProperties).click(function() { a._deleteButtonClick($(this)) });
                a._datasourceGroupMeasurements.push(b);
                a._handlers.add(b)
            },
            Close: function() { a._handlers.close();
                $(this).dialog("close") }
        },
        modal: !0
    })
};
epiviz.ui.controls.ComputedMeasurementsDialog.prototype._addButtonClick = function(a) { a = a.data("measurement"); var b = this._selectExpressionTextBox();
    b.val(b.val().trim() + " {" + a + "}") };
epiviz.ui.controls.ComputedMeasurementsDialog.prototype._deleteButtonClick = function(a) {
    for (var b = a.data("measurement"), c = this._datasourceGroupMeasurements[b], d = 0; d < this._datasourceGroupMeasurements.length; ++d) {
        var e = this._datasourceGroupMeasurements[d];
        if (null != e && e !== c && e.isComputed() && e.componentMeasurements().contains(c)) {
            a = new epiviz.ui.controls.MessageDialog("Measurement cannot be deleted", { Ok: function() {} }, "There are other measurements that depend on the one selected. Please delete those before deleting this.",
                epiviz.ui.controls.MessageDialog.Icon.ERROR);
            a.show();
            return
        }
    }
    for (var f in this._chartsMeasurements)
        if (this._chartsMeasurements.hasOwnProperty(f) && this._chartsMeasurements[f].contains(c)) { a = new epiviz.ui.controls.MessageDialog("Measurement cannot be deleted", { Ok: function() {} }, "There are charts using the selected measurement. Remove them from the workspace and then try again.", epiviz.ui.controls.MessageDialog.Icon.ERROR);
            a.show(); return }
    this._datasourceGroupMeasurements[b] = null;
    a.parent().parent().remove();
    this._handlers.remove(c)
};
epiviz.ui.controls.ComputedMeasurementsDialog.prototype._tabActivate = function(a) {
    if (0 != this._selectTabs().tabs("option", "active") && (a.newPanel.empty(), this._measurementsList = this._maxTextBox = this._minTextBox = this._expressionTextBox = this._nameTextBox = this._idTextBox = null, this._selectedDatasourceGroup)) {
        a.newPanel.append(sprintf('<label for="computed-measurement-key-%1$s"><b>Id:</b></label> <input id="computed-measurement-key-%1$s" class="ui-widget-content ui-corner-all" style="padding: 2px;" type="text"/>&nbsp;<label for="computed-measurement-name-%1$s"><b>Name:</b></label> <input id="computed-measurement-name-%1$s" class="ui-widget-content ui-corner-all" style="padding: 2px;" type="text"/><br /><br /><div id="computed-measurement-measurements-%1$s" style="overflow: auto; max-height: 200px; border-style: solid; border-width: 1px; border-color: #999999;"></div><br/><label for="computed-measurement-min-%1$s"><b>Min:</b></label> <input id="computed-measurement-min-%1$s" class="ui-widget-content ui-corner-all" style="padding: 2px;" type="text"/>&nbsp;<label for="computed-measurement-max-%1$s"><b>Max:</b></label> <input id="computed-measurement-max-%1$s" class="ui-widget-content ui-corner-all" style="padding: 2px;" type="text"/><br/><div style="overflow: hidden; padding: 10px; padding-right: 20px; margin: 0px;"><textarea id="computed-measurement-expr-%1$s" class="ui-widget-content ui-corner-all" style="width: 100%%; height: 55px; padding: 5px; margin: 0; resize: none;"></textarea></div>', this._id));
        a = this._selectMeasurementsList();
        for (var b = "", c = 0; c < this._datasourceGroupMeasurements.length; ++c) {
            var d = this._datasourceGroupMeasurements[c],
                e = "";
            d.isComputed() && (e = '<button id="delete-button-%2$s-%3$s" data-measurement="%2$s">Delete %2$s</button>');
            b += sprintf('<div style="min-height: 30px; padding: 2px;"><div style="margin: 6px; float: left;">%1$s {<b>%2$s</b>}</div><div style="float: right;">' + e + '<button style="" id="measurement-button-%2$s-%3$s" data-measurement="%2$s">Insert %2$s</button></div></div>',
                d.name(), c, this._id)
        }
        a.append(b);
        for (var f = this, c = 0; c < this._datasourceGroupMeasurements.length; ++c) d = this._datasourceGroupMeasurements[c], d.isComputed() && $("#delete-button-" + c + "-" + this._id).button(this._deleteButtonsProperties).click(function() { f._deleteButtonClick($(this)) }), $("#measurement-button-" + c + "-" + this._id).button(this._addButtonProperties).click(function() { f._addButtonClick($(this)) });
        this._selectIdTextBox().watermark("[auto]");
        this._selectNameTextBox().watermark("[auto]");
        this._selectMinTextBox().watermark("[auto]");
        this._selectMaxTextBox().watermark("[auto]");
        this._selectExpressionTextBox().watermark("[expression; for example: {0} - {1}]")
    }
};
epiviz.ui.controls.ComputedMeasurementsDialog.prototype._selectDialog = function() { this._dialog || (this._dialog = $("#" + this._id)); return this._dialog };
epiviz.ui.controls.ComputedMeasurementsDialog.prototype._selectExpressionTextBox = function() { this._expressionTextBox || (this._expressionTextBox = $("#computed-measurement-expr-" + this._id)); return this._expressionTextBox };
epiviz.ui.controls.ComputedMeasurementsDialog.prototype._selectIdTextBox = function() { this._idTextBox || (this._idTextBox = $("#computed-measurement-key-" + this._id)); return this._idTextBox };
epiviz.ui.controls.ComputedMeasurementsDialog.prototype._selectNameTextBox = function() { this._nameTextBox || (this._nameTextBox = $("#computed-measurement-name-" + this._id)); return this._nameTextBox };
epiviz.ui.controls.ComputedMeasurementsDialog.prototype._selectMinTextBox = function() { this._minTextBox || (this._minTextBox = $("#computed-measurement-min-" + this._id)); return this._minTextBox };
epiviz.ui.controls.ComputedMeasurementsDialog.prototype._selectMaxTextBox = function() { this._maxTextBox || (this._maxTextBox = $("#computed-measurement-max-" + this._id)); return this._maxTextBox };
epiviz.ui.controls.ComputedMeasurementsDialog.prototype._selectTabs = function() { this._tabs || (this._tabs = this._dialog.find(".computed-measurements-tabs")); return this._tabs };
epiviz.ui.controls.ComputedMeasurementsDialog.prototype._selectMeasurementsList = function() { this._measurementsList || (this._measurementsList = $("#computed-measurement-measurements-" + this._id)); return this._measurementsList };
epiviz.ui.tutorials = function() {
    this._tutorialList = [{
        name: "Epiviz Overview",
        id: "tut_epiviz_overview",
        tutorial: [{ target: "body", content: "<p class='intro-header'>Welcome to Epiviz Genomic Browser!<br></p><p class='intro-text'>This tutorial will walk you through the functionality available in Epiviz.</p>", position: "center" }, {
            target: "#intro-navigation",
            content: "<p class='intro-text'>The navigation section of Epiviz lets you select a chromosome and explore the genome. Options are available to move left/right and zoom in/out.</p><p class='intro-text'>The settings icon allows you to control the navigation parameters.</p>",
            position: "right",
            buttons: [AnnoButton.BackButton, AnnoButton.NextButton]
        }, { target: "#search-box", content: "<p class='intro-header'>Use the search input to look for a specific gene or target.</p><p class='intro-text'>This will navigate Epiviz to the selected gene location and update the workspace with the new data.</p>", position: "right", buttons: [AnnoButton.BackButton, AnnoButton.NextButton] }, {
            target: "#vis-menu-button",
            content: '<p class="intro-text">Choose from a list of available data sources, measurements or chart types to add visualizations to the Epiviz Workspace.</p>',
            position: "right",
            buttons: [AnnoButton.BackButton, AnnoButton.NextButton]
        }, { target: "#intro-workspace", content: '<p class="intro-header">managing workspaces.</p><p class="intro-text">If you are logged in, you will be able to save your Epiviz analysis and workspaces.You will also be able to retrieve them at a later time from your account.</p>', position: "right", buttons: [AnnoButton.BackButton, AnnoButton.NextButton] }, {
            target: "#login-link",
            content: '<p class="intro-text">Please login to save and manage Epiviz workspaces.</p>',
            position: "left",
            buttons: [AnnoButton.BackButton, AnnoButton.NextButton]
        }, { target: "body", content: '<p class=\'intro-header\'>Thank you for using Epiviz!</p><p class="intro-text">If you would like to give us some feedback or stay informed with updates, Please visit the <a target="_blank" href="http://epiviz.github.io/">Epiviz webpage</a>.</p>', position: "center" }]
    }, {
        name: "Data Visualization and Controls",
        id: "tut_data_controls",
        tutorial: [{
            target: "body",
            content: "<p class='intro-header'>Welcome to Epiviz Genomic Browser!<br><br>Data visualization tutorial<br></p><p class='intro-text'>This tutorial will help create/add new data visualizations to the Epiviz workspace and controls available for each visualization.</p>",
            position: "center"
        }, { target: "#vis-menu-button", content: '<p class="intro-text">The Data Visualizations button helps users add new charts to the workspace.</p><p>Users have the option to choose data sources and measurements to add to the workspace.</p>', position: "right", onHide: function(a, b, c, d) { $("#vis-menu-button").button().trigger("click") }, showOverlay: function() {}, buttons: [AnnoButton.BackButton, AnnoButton.NextButton] }, {
            target: "#vis-menu",
            content: '<p class="intro-text">Choose the type of chart to add to your workspace. We choose scatter plot to continue with the tutorial</p>',
            position: "right",
            onShow: function(a, b, c) {},
            onHide: function(a, b, c, d) { $("#plot-menu-add-scatter").trigger("click") },
            showOverlay: function() {},
            buttons: [AnnoButton.BackButton, AnnoButton.NextButton]
        }, {
            target: function() { var a = $("#wizardDialog").parent().attr("id"); return $("#" + a).parent() },
            content: '<p class="intro-text">This window lets you choose form a list of data sources and the measurements available from each data source to add to your Epiviz workspace</p><p>We selected the first data source in the table or choose a data source from the list.</p>',
            showOverlay: function() {},
            onShow: function(a, b, c) { $("#wizardDialog table tbody tr:first").trigger("click") },
            onHide: function(a, b, c, d) { $('.ui-button:contains("Next")').trigger("click") },
            position: "right",
            buttons: [AnnoButton.BackButton, AnnoButton.NextButton]
        }, {
            target: function() { var a = $("#wizardDialog").parent().attr("id"); return $("#" + a).parent() },
            content: '<p class="intro-text">After choosing a data source, the next tab lists all the measurements (or features) available from this data source. If you have any computed measurements for this data source, they will be added to this list.</p><p>To add a plot to the workspace, pick a few measurements and select finish on this window. </p>',
            showOverlay: function() {},
            position: "right",
            onShow: function(a, b, c) {},
            onHide: function(a, b, c, d) { a = $("#wizardDialog").parent().attr("id");
                $("#" + a).dialog("close") },
            buttons: [AnnoButton.BackButton, AnnoButton.NextButton]
        }, {
            target: "#feature-view",
            content: '<p class="intro-text">Visualizations are added to the workspace based on the type of chart. </p><p>Brushing is implemented on all the plots. When you hover over a data point, it highlight that region in the gene on all the visualizations.</p>',
            position: {
                top: "24em",
                left: "14em"
            },
            showOverlay: function() {},
            onShow: function(a, b, c) { $('button:contains("Remove"):first').css("display", "block") },
            buttons: [AnnoButton.BackButton, AnnoButton.NextButton]
        }, {
            target: function() { return $('button:contains("Remove"):first') },
            content: '<p class="intro-text">Removes the plot from the workspace</p>',
            position: "left",
            showOverlay: function() {},
            className: "anno-width-175",
            onShow: function(a, b, c) { $('button:contains("Save"):eq(1)').css("display", "block") },
            onHide: function(a, b, c, d) {
                $(b).css("display",
                    "none")
            },
            buttons: [AnnoButton.BackButton, AnnoButton.NextButton]
        }, { target: function() { return $('button:contains("Save"):eq(1)') }, content: '<p class="intro-text">Save a plot to your local machine (image, pdf)</p>', position: "left", showOverlay: function() {}, className: "anno-width-175", onShow: function(a, b, c) { $('button:contains("Custom settings"):first').css("display", "inline-block") }, onHide: function(a, b, c, d) { $(b).css("display", "none") }, buttons: [AnnoButton.BackButton, AnnoButton.NextButton] }, {
            target: function() { return $('button:contains("Custom settings"):first') },
            content: '<p class="intro-text">Change chart display properties and aggregation methods for grouping.</p>',
            position: "left",
            showOverlay: function() {},
            className: "anno-width-175",
            onShow: function(a, b, c) { $('button:contains("Code"):first').css("display", "inline-block") },
            onHide: function(a, b, c, d) { $(b).css("display", "none") },
            buttons: [AnnoButton.BackButton, AnnoButton.NextButton]
        }, {
            target: function() { return $('button:contains("Code"):first') },
            content: '<p class="intro-text">Edit code to re the chart on the workspace.</p>',
            position: "left",
            showOverlay: function() {},
            className: "anno-width-175",
            onShow: function(a, b, c) { $('button:contains("Colors"):first').css("display", "inline-block") },
            onHide: function(a, b, c, d) { $(b).css("display", "none") },
            buttons: [AnnoButton.BackButton, AnnoButton.NextButton]
        }, {
            target: function() { return $('button:contains("Colors"):first') },
            content: '<p class="intro-text">Choose colors for data points on the plot</p>',
            position: "left",
            showOverlay: function() {},
            className: "anno-width-175",
            onShow: function(a, b, c) {
                $('label:contains("Toggle tooltip"):first').css("display",
                    "block")
            },
            onHide: function(a, b, c, d) { $(b).css("display", "none") },
            buttons: [AnnoButton.BackButton, AnnoButton.NextButton]
        }, { target: function() { return $('label:contains("Toggle tooltip"):first') }, content: '<p class="intro-text">Toggle tooltips for data points</p>', position: "right", showOverlay: function() {}, className: "anno-width-175", onHide: function(a, b, c, d) { $(b).css("display", "none") }, buttons: [AnnoButton.BackButton, AnnoButton.NextButton] }, {
            target: "body",
            content: '<p class=\'intro-header\'>Thank you for using Epiviz!</p><p class="intro-text">If you would like to give us some feedback or stay informed with updates, Please visit the <a target="_blank" href="http://epiviz.github.io/">Epiviz webpage</a>.</p>',
            position: "center"
        }]
    }, {
        name: "Computed Measurements",
        id: "tut_comp_measurements",
        tutorial: [{ target: "body", content: "<p class='intro-header'>Welcome to Epiviz Genomic Browser!<br>Compute Measurements Tutorial<br></p><p class='intro-text'>This tutorial will help you create new measurements (derived from existing measurements) and generate plots to add to the workspace.</p>", position: "center" }, {
            target: "#computed-measurements-button",
            content: "<p class='intro-text'>The computed measurements button helps users add new measurements to data sources</p>",
            position: "right",
            onShow: function(a, b, c) { $("#computed-measurements-button").button().trigger("click") },
            buttons: [AnnoButton.BackButton, AnnoButton.NextButton]
        }, {
            target: "#computedMeasurementsDialog",
            content: "<p class='intro-text'>This tab lets you choose a data source where you will create a new measurement.</p><p>We choose the first data source in the list or choose any data source.</p>",
            position: { top: "20em", left: "1em" },
            showOverlay: function() {},
            onShow: function(a, b, c) { $("#computedMeasurementsDialog table tbody tr td:first").trigger("click") },
            buttons: [AnnoButton.BackButton, AnnoButton.NextButton]
        }, {
            target: "#computedMeasurementsDialog",
            content: "<p class='intro-text'>The measurements tab lists all available measurements from the selected data source (including previously created computed measurements).</p><p>Use the buttons next to each measurement to add to the expression window</p>",
            position: { top: "20em", left: "1em" },
            showOverlay: function() {},
            onShow: function(a, b, c) { $('.ui-button:contains("Next")').trigger("click") },
            buttons: [AnnoButton.BackButton,
                AnnoButton.NextButton
            ]
        }, { target: "#computedMeasurementsDialog", content: "<p class='intro-text'> After choosing measurements, use mathematical operators to evaluate the expression.</p><p><a target='_blank' href='https://silentmatt.com/javascript-expression-evaluator/'>supported operators</a> </p>", position: { top: "33em", left: "1em" }, showOverlay: function() {}, buttons: [AnnoButton.BackButton, AnnoButton.NextButton] }, {
            target: "#computedMeasurementsDialog",
            content: "<p class='intro-text'>After adding a computed measurement, use the data visualization button to plot the measurement to your workspace.</p><p>To learn how to add new plots to the workspace, please use the Epiviz data visualization tutorial.</p>",
            position: { top: "10em", left: "1em" },
            showOverlay: function() {},
            onHide: function(a, b, c, d) { a = $("#computedMeasurementsDialog").parent().attr("id");
                $("#" + a).dialog("close") },
            buttons: [AnnoButton.BackButton, AnnoButton.NextButton]
        }, { target: "body", content: '<p class=\'intro-header\'>Thank you for using Epiviz!</p><p class="intro-text">If you would like to give us some feedback or stay informed with updates, Please visit the <a target="_blank" href="http://epiviz.github.io/">Epiviz webpage</a>.</p>', position: "center" }]
    }]
};
epiviz.ui.PrintManager = function(a, b, c, d) { this._containerId = a ? a : "pagemain";
    this._fName = b ? b : "epiviz_" + Math.floor($.now() / 1E3);
    this._fType = c ? c : "pdf";
    this._workspaceId = d };
epiviz.ui.PrintManager.prototype.print = function() {
    function a(a) { $(a).find(".domain").each(function() { $(this).css({ fill: "none", "stroke-width": "1px", stroke: "#000000", "shape-rendering": "crispEdges" }) });
        $(a).find(".gene-name").each(function() { $(this).remove() });
        $(a).find(".lines path").each(function() { $(this).css({ fill: "none" }) });
        $(a).find("text").each(function() { $(this).css({ "font-size": "11px" }) });
        $(a).find(".chart-legend").each(function() { $(this).css({ border: "none", background: "transparent" }) }) }
    var b =
        this,
        c = $("#" + b._containerId),
        d = c.find("svg");
    d.each(function() { var b, c;
        b = document.createElement("canvas");
        b.className = "tempCanvas";
        a(this);
        c = (new XMLSerializer).serializeToString(this);
        c = c.replace(/xmlns=\"http:\/\/www\.w3\.org\/2000\/svg\"/, "");
        canvg(b, c, { useCORS: !0, renderCallback: function() { $(b).insertAfter(this);
                $(this).hide() } }) });
    html2canvas(c, { timeout: 0, width: c[0].scrollWidth + 200, height: c[0].scrollHeight + 200, useCORS: !0 }).then(function(a) {
        var e = a.getContext("2d");
        e.mozImageSmoothingEnabled = !1;
        e.imageSmoothingEnabled = !1;
        var e = b._fName + "." + b._fType,
            g = b._fType,
            h = a.toDataURL("image/png");
        "pdf" == g ? (a = new jsPDF("l", "px", [.6 * (1400 < c[0].scrollWidth ? c[0].scrollWidth : 1400), .65 * (1E3 < c[0].scrollHeight ? c[0].scrollHeight : 1E3)]), a.addImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQ4AAAAyCAYAAACtfjXHAAAVX0lEQVR4nO1de5QU1Zn/db27errnxVMcHAaF+AxmiKLBRN3Bo+7RELOAB4OS1YVN9piHyQmY1SSuiYKJa8IxcSFZwyZRw2BO3NWsCeJj1SO7hEHFVzAwIIg4wsz0dE/XVHU9ev+oLqem+lZ3VVd1z6j1O6fOzNS9db9bNfd+93vd78balm/BREWit1tgWk8/T2cbLlDZxnlGjJ1tUPRkytAnq0yCYXUpb1DsAGWoBwHspoz8U/zgq9szUxYOjXffAXQAWAdgSfHv7QDWAugJmc46AGuKv/cUaWwPmUaEDykOPbC0qudiE41xJHq7Of3Erit1ir3aoLjLdIoX/TxPG3kNMLaxWu5+Lv3GI5kpC/Va9bUC9sNkHnYMApgPoDckGk8A6CLcn4/wGVSEDyGqZRxUyP2oGo3pPZN4LXu73L74sMy1bFWZ5Of9Mg0A0CmO0SnhcplrfTg36ZN/FdTBf0y99zxXiz6XwRqUMg0AaAawMSQaq0BmGoAphUSIUDNQydyBk8e5Dw2sLt0x3HjqAYVJ3qJT3JSwGtYpfpbMNt+Xa+3cK+QHqmOt1WFJmbIumAwkKFbVgUaECERQknjia7w29MPG9J6GehPn1cwywNir0uLNeowl0qcNuY/Vhp9mtez9rJa7W8j3387q0l2sLm2iDfkxFPSDlejodLxd5lq2sFruqcTIkTmhv0gpSNKGHeUmvdf2OyvUcZNGIkx8rANQALALE3QBoPQYyylM4zeHU3P3NEiHLq4H0Qbp8CRWy3UrbOq3AHWCvYw28mley/yGLqgrEvLRWTolTFOZhotVJnm9yiS+KXOt31FpcY1Ki6t1SrgCMXpWQj46nTbyqwHjccBQ3eiqTOIimZ/8UnJ439rDDy6ja/R6Haj8zw46qctJNPZ+TER0wJwU9mtN2Sc+erAWlk4EX2RqgvdtHDrFzxqOz3hCyA/c0Zjew9SKoKj0XTYiTHlFZRK2wW8YvJb9E6+mP8e++eA0hUmt0GPsb3LC9INe2swJ09/VKW4TQF2eGni5ndZHbqON/HukujrFxbMNJ9859/Mbnm489sJJobzUWHiZsEFVCS+MZ6IyjgiVsan4s8f2+4TCWONojKZkruXm4eQpzyZGjrSFSSjR280I+YF1EjfpDzrFTzPvGnley9wvKsdPVZjkpQrb9Ij8sZVKEDqZlrPf0en493h1sJ3XMl8DjHdJ9SR+6gVSy7yXROXYlUHoEUBSIbYS7lW7kjSjlHGQ2o8YxwcXawHEYHrHBse5L0QQvSo6HT9P5if/WZTf/VQYRJLD+6fIJ13xlMy1rEGMjgEGROXY75PZ/acrTOp6iZ/yZhh07JD4qSMKk/qJkE+fAuAHKOglDEmlxSaJa3kkIR/9QYiqC0mSIK0a1aorJIbTg1L3ayUbSIQIVcPVHatT3FRJmPKkkB+4PgiBhHx0niSe+Gedjl9g3jFeTMh9F0n85KuyyVP2BWnbC2SuZRjALYI6dAZtKNtKKsToWE6Y/u25V214tOGtR5IhkCSt9D0olQqqVVdIDGcTSmNDmqtsP0KEiqAA5MsU8zLX9Atey9x++MFlMb+NC/n+q2R+0vM6xc9EQZd5LXsTQM3PCdOfqb7L1UHmWvYd/O21lxaNqFlnuSRMvUydcfELjcd3zgpIyrnSDxYvUkCWX3WFpKZsL7ZPCiqL1JUINQGVzB04nS6oW2Bat0lVoDCpWzqW/fL+1JFtrJdGDz+4LMZqw7fIbNPDeoxN0EZ+l6AOdipM8h4ARnjd94e25VsKOsVtonXl47Q+ssNZrjCpM4ZbztohqINBxHznZLUYRhjqCsmbYoWXk3ThoOpKF0yPxy6UekJ2Fcsmott3TfFy9rkAoBvuAXoRPILKJmbt02Ps1byaXkgb8ituFVVaXDkybeEjjcd3lo3mTB3Zxp68ZON/qEzD7YjFQBvKnTrFnSdzk14Pv/vVQafjB4S3Hv00q0t3wsHIdEqYqjINTwv5/r+pomnSRLUkgUGU7iHxq664qSkAWaKpVlVZBTNk/gmYMQWk9+oslj1RrOvFRewGK27B7fLirm22tbMO7tGzS4pl1vt5Za4W89zlsX4lNAMYAPn9rPfoLvNsue9V7hog0PON920cCtv0QuLos528NnQzCrpMqqzS4uXDzWc+nsq8kSKVNw7sToxM/dR/KmzTCgBpVpcX6xT/bQBa0I6GjVzHUk2lxW8L+f7FtJHP2Mv0GJtU2dR/C/kBv5OBtIrZVQjS5jOvNJoJdS01xUmnXH8q0XgCZli8n2c7YA7yboyPXaULJiPwOyG6YDICLyH664s/OxGO4XkVzG81iPq6XC0GG0hSHGMczcy4RFWYxnWCmv4kbSgvkx7Q6finc4n2pxqkw5Ps91OZv7RKjR97UmUSl9GGspfXsueotPhfQTpXD8hc66MNQ68v4LXsXvt9PcZyMtv4EK8NfcFHc5UYRxB1pZyaYtFxqit+BngnzEkUZEAtgcl46qkGrCrSDMKw1hTbKIetGP1fBpGuLFj2LTvz94pBmO7aai5LMg3E/IheFZlrfbVh8JVzeS2zgWSS0Ol454gw+VlR7jsBABIj70zNNbQ/o9LiuawuPSuOvHO+wiT/GqRj9cRQ87w3+L4d5/Ja5g9jCmI0rTCNm3k17dWzVIlxkIykS+Bt0JMmtNNT45Q6vE5gS2Ig1d8EYCnGDr4WmLEGJCmnE/WTPJbAfdPgegCLUDpx3NIOdMFdNbBgfe+gjKMLo9+aFINTK3Ta6AZKveDqjh1qna8oTOqrQj59NQr6sLNcp4RTFa75eVHumx0rqBqAAq9lHxLTr1+STcwaCNKp8UBmxiVDzKE/Xslq2TsczJJWmOTPeTX9JQ/NVGIcAHmgVBqIJG9KD6Htal2yJKbRAzMAaTVK+zwIc2LOxqgIb0cn/O0CtgKe3C4SjQ4XGtsxythIk8NiKEtRutIvQXl1x/oOHQjGPKxne1E/xmEtDs1FmoHSLlTcVi9zLVtE5dgC2pDfcpbpFDdL4ZqeU9nGaYnju87e133DNUOt8wNFfo4nch1LDZVJ/nNC7rvezOtRRIyOKWzTT3k1fWOFJpziH0l9IA2USuoByYhKasdNAiiHNYQ62+E9p8dakCf2EtR2n8VGlH6TTTCZghfRf6tL3XVwl9TsgXZhMI562jasxaEH5mIQCJ7ycUjCtNfEkaMLaEPZ6SzTKX66RovP5ps+1tm2fIuLS/eDhZww/X5ROnwFbch2SSumsKkNvJq+2eUx0upOmsi98K+ukAapV8ZRTl1pRukK2wtzNfYCaxVzW6VrtXmtE2QJzO+EcHvGi9SxBNXZciyjqL2tWsPyHln/28Bh7J4T+WQTs94Vc29dxOrSY84yneJaVCb1pJDvr8vu2nog2zD7jw1Df/kMq2Vte10oKGzTHbya/hEhIM6LmmLBj7riVU1xo1ducNsHsYW1qDywrIRE5dyw1upfC1sHiWa1+Va2olSlKcfI12P0+1QjddhTSYaVCa4cLA/KIMxvFApNXxnAssk5kpjd9zm6oD7gLNMprsF0YfZ/NoyOTQQMNc/bLfa/dB6vZt6w31fYpm+0L9v8UCrzRtx2u1wMhxNuxjkSvKopbvTKMQ7nwPeic6+BGQvgpoZYas5qkFW1MECKng0yIZwqA4lZ22F9I7+qWIet3XpIG6swKj2Fmu/Wd+rAoaazNGrPfdexWnazs0yPsbzKpn4n5I9fG0rvxgGJkbdTrJbbxmvZLezLG+ihqRcc5I/tXMir6efs9XQ6vmwkcdL/iMqxmcVbpBXKbTCTNqW5BYORBrCbRZw0UcsxDiezKzeYV8FkGG4xDz0wJYxFqG2+02aQbTJBQHq+3HezG0n9uK/tRtFa2ze6MGo8Xhs2vapyjqof/4quMsm/57Whf3OW6TGWltnmzayWvSl49+oLXhuaKfNTnleZxCID1HSxbaEAAJkTugaYw9suEfIDYyaWSouflPjJu3ktsxj+VBWgdJK6rXJOqYDEdMrRdDOOum3GI9HfD7Ix0qK3GqaUUY/s6n6/sxeQ3OTlGIddwvGjrlgSSq2lDcv2BJgMg2S8DoQgyYoL+7pXfZnXMj8uKYnRMZVJ3s1r2XvZlzfUKtNWqBDyx8/RaPH/dIo7k9Vyj4vp1y4davlEzirPdSyV//rwl64WlffucbhrW1Ew1sOfqgJ4iyIl6dqVBp1XdYV0zy6tdME0qrnFdwzCXMlmo/6Rj6S+BIUfSQ0YfWevjMNuTK0l42jGqNt1O0LwoJAQKNNX2/ItBQX4Oq+mhxU2dYuTDylM8p/YM25oE/ID1xS3t09I8FrmOpmbdB+AOK9lf8337bh+aMYlJSkI25ZvMSTgJlF+96DET/5XxGgaADRaOBlAxlG9kn5vSQ52hmOpK4O2v52otKr3oHQwWxZ1L3CeB0PCephM46OMTTDtB80wJYlKzNP6npUkxqDohvn/tlTH9/HA/95eUvm52SX3VgKwZ8a7rXhvs71SKMcjKGzTrUI+fSNglJxhotLilSrTsENU+sY7m3oJEvJRgdWljQqT2gwgLirH7t7XfcN1GQLTsEMSpm0Q88eXoKBLAKBTAgWgyVHNy0StpK6QjJeVBh2JWXkV75uL991W200YDa5yg7UZbI3tChOk9xuP/TH2TYt+AvhqKW1sLNLx41K3Yx6AXwL4XvFqhzmu73FWDO1cFZlruVfID1xNF9SSDXI6xZ2hsM1/FvIDl4VFLygapEPzZbapR6XFVXRB1YX8wI0SP/mbXmNRJH7q73ktexEKOjG3KbwxjnLqih9vSiW6Xg23lvTjZAxbMeopKSdF2Q2X1g7VMPZ12FFNkFutYP0/uir0oR4b2tYU6QRxu9oZRBrA1wF8FaWLYrgHMsncpIcF5fjFtJEvyfOpU1yTzLU8xurSjxr7d/Fh0vWDZPZNVlAHbxuJT9+h0/HTaCOfEeT3rpC5lnv9tqWwTTtpI7+ALmikvKZe/nGkeAyLYXjZm+LWphNug5oUiAaYDG1T8acVnu1FvK60Ec8NfiQGkiFzvHKCeN34ZpVtRW3c01aqAMBk7tWoQhcWLwuW7fJrpMqhn+SWE6bv4NWhc1hdeolET6XFbww3n7FTyB8/PWzalSAqfZ+REu0vymzzd/QYy9CG/GZc6VuQi894vNo2dTp+QI9RpHM0vXJ8N3XFGSPgRU0BRjOO2eGmejhp2/dgrIbJNPx4SkhqifN5rxJROTj7TYokrRcqbXyzb8OvhZpi37OzNgCNX9p+PwjgJzAlkBJpA6jREZASP/mwIL39KVaXNpPKdUo4S+Ym7Wa13Pp6HASVGDkyh9Wl30n81Kd1ijsdAHgt+4eGzJvnDsfb3qj0fGWMPRumiGoZB2CuHtWoKW603c562QTyXo1qbAakrFq9IDMeJ02/k570LdzcxbWGpXq4bXyzx26E7a628qc0I5jbdSVMe4aF22AyjJVuD9Ts7Nhsco6k0uIXhXz/P9AFdYRQhVOZxLeGU3P/wmvZLyR6u0M/yyUx8vZprJb9VS4+/TWVFq8CEKMLqibkj6/d133DFUNNZ6VDIhUktoCkrpDa88M4SJKJm0vVOdjsMQBe0QVyYJibEZX0vn6YBymAqpp+hwE7QyjHOGph27Bc5UHcrk7j50swPSjt5R6q+aHTMtf6C1F6ez5tyLtJ5TrFz1CY5K/l9sV7eTX95cb0HiEIvURvNyfk+z/ParltufgJr6pMcgVAMQBAG8pBQX7vIpmbtD7kDXkOG4JxKLbrrjJJoEtQiSm4JTt2g5/Q8/WEtq3MWF6MjlYiHSe2wv293CQGP5vGSPlArH57bcduGwgCu5HULvWsKvalFkZRy4NS4nb1Cafx8+teHqrLafXZxKzXxdyhBbya/j5dUIkTSqe4DoVt+ulwau5RUXnvV8nh/Vcmers9MZHGYy9MF/L9y3gt8yu5fXGfzLU+rDKJRQBV3IhmgNWlf08M9348F5/xfHhvBoA4SKk3C/O/lSu974pKIqzfQefVJWuBZIW3MoJtROlKau2qtcqdsKJJ3eB2gNR+eE9rZ3kPnOjEaKQraS+JlYB5P0ZjHoLCUvmsmA4LdmNzmEZRy4PSi2BMowljjZ/PFK+KqNlRj05kk3NUALcmRo5syXPNG1VaPJ9UT6f4JomfsgL8lBW0eGKe14ZeB/BKzNDfAQppoFAoxBhRo8UmwJgDUHOHJp07CzFygCpt5A/wavorEj/lMTV1qqe+HnrAuwt85jXdpIHn16ptDSw3Hd2vbuxVVbFgDUBS2r9V8LeZy2qr3ETphSkxkFZ7UuyHW84Pa7UlSTxWn/0kFAqCrUWaS2D2tVYb2iymPQjvuUfc4DR+ftHrg3VjHBZy8RmvHn5w2cJT/u5nV6tMYp1OCTPd6uoUz+kUPw9mYIov0EY+QxW0H8b7d9+dmbKQZGMJC5VCt71iPcgTqRqjWjWxDr0wYzW6Ub2HYju853tYD3I+kGpozofJIMbz9LpNMBlHJ0zmYfUl7Cxf1jaEXgTbo9OOscbPzTC9KZ5QF1XFibblWwoy1/pQw+Crc3ht6EZaHzkSVtusLh3jtey/iNLb7Sotfr/GTAPwtyu2HEinsQHVhXb7cck6n7PiNvy8g6Wa+F0B11ZBiwQrzWE13yqsnBg9GGXw9uRGYds2rP52wOfRCNcsuPX96/DUkw7Y2rSCvTxjXBiHBTOvaeO91Ks/70gO718h5Ad2oFAStV4ZBV0X8v1PJrN7r9Vf+lmbwiS/m23oqNdhvaTVuZrBaOnsPY6/q12tnOqKnyMht8LcvLYI7nkceoplixBso5uTVpDVeT3MHKWr4Z6QyNqctxZm+HyYm8CWYqx0uB7h70zdDm/JllzRJfeirW9MJtAfw2QenhFrW06KXRo/NEiH5o4I0z6LWOxvAZyvx1iiOkUb+eOUkX+SgvEnbuTdP2aTc46G1Qc/No4IET4oeG72mdavL2JU/T8I4GyUMo4LATxt+3tMxru62zgqYVicuRfAXQDuSh56NG5M/sRphRh9ms6ITSgYlEFxR1DQ9/R237CvbfkWAwCUJPF8qAgRIpRiJcbaDG+DT2kDmICMw47szCtG4LINeaJJShEifEDwXdvvVrCXb0xoxhEhQoRQsRhjI0IPYiwjsaPd8feYerFC4UNxokGECBEq4LnZZ34XZp6NwBhXr0qECBHqipJD1apFpKpEiPDRwWaYkaJejjBpwlgj6jP2wkhViRDhIwKbO9YLLkQZd2ykqkSIEME3IsYRIUIE34gYR4QIEXwjYhwRIkTwjcirEiFCBBLSKJPU5/8B11FP6b8S6U4AAAAASUVORK5CYII=",
            "PNG", 20, 20, 100, 21), a.setTextColor(0, 0, 0), a.setFontSize(10), a.addImage(h, "PNG", 15, 55), a.save(e)) : (navigator.msSaveBlob ? (h = a.msToBlob(), a = new Blob([h], { type: "image/png" }), navigator.msSaveBlob(a, e)) : (a = new Blob([h], { type: "image/png" }), g = document.createElement("a"), void 0 !== g.download ? (URL.createObjectURL(a), g.setAttribute("href", h), g.setAttribute("download", e), g.style = "visibility:hidden", g.setAttribute("target", "_blank"), document.body.appendChild(g), g.click(), document.body.removeChild(g)) : (e = h.replace("image/png",
            "image/octet-stream"), window.open(e))), c.find(".tempCanvas").remove(), d.each(function() { $(this).show() }))
    })
};
epiviz.ui.ControlManager = function(a, b, c, d, e) {
    this._config = a;
    this._chartFactory = b;
    this._chartManager = c;
    this._measurementsManager = d;
    this._locationManager = e;
    this._addChart = new epiviz.events.Event;
    this._activeWorkspaceChanged = new epiviz.events.Event;
    this._saveWorkspace = new epiviz.events.Event;
    this._deleteActiveWorkspace = new epiviz.events.Event;
    this._revertActiveWorkspace = new epiviz.events.Event;
    this._loginLinkClicked = new epiviz.events.Event;
    this._searchWorkspaces = new epiviz.events.Event;
    this._search =
        new epiviz.events.Event;
    this._activeWorkspaceInfo = null;
    this._stepRatio = a.navigationStepRatio;
    this._zoominRatio = a.zoominRatio;
    this._zoomoutRatio = a.zoomoutRatio
};
epiviz.ui.ControlManager.CHART_TYPE_CONTAINERS = { plot: "feature-view", track: "location-view", "data-structure": "data-structure-view" };
epiviz.ui.ControlManager.DISPLAY_TYPE_LABELS = { plot: "Feature", track: "Location", "data-structure": "Data Structure" };
epiviz.ui.ControlManager.prototype.initialize = function() {
    this._initializeChromosomeSelector();
    this._initializeLocationTextbox();
    this._initializeNavigationButtons();
    this._initializeZoomButtons();
    this._initializeLocationSettingsDialog();
    this._initializeChartMenus();
    this._initializeComputedMeasurementsMenu();
    this._initializeHelpButton();
    this._initializeSearchBox();
    this._initializeWorkspaceSaving();
    this._initializeTutorials();
    this._initializeScreenshotMenu();
    this._initializeLoginLink();
    this._initializeLayout();
    this._checkBrowserCompatibility();
    this._registerLocationChanged();
    this._registerSeqInfosUpdated()
};
epiviz.ui.ControlManager.prototype.onAddChart = function() { return this._addChart };
epiviz.ui.ControlManager.prototype.onActiveWorkspaceChanged = function() { return this._activeWorkspaceChanged };
epiviz.ui.ControlManager.prototype.onSaveWorkspace = function() { return this._saveWorkspace };
epiviz.ui.ControlManager.prototype.onDeleteActiveWorkspace = function() { return this._deleteActiveWorkspace };
epiviz.ui.ControlManager.prototype.onRevertActiveWorkspace = function() { return this._revertActiveWorkspace };
epiviz.ui.ControlManager.prototype.onLoginLinkClicked = function() { return this._loginLinkClicked };
epiviz.ui.ControlManager.prototype.onSearchWorkspaces = function() { return this._searchWorkspaces };
epiviz.ui.ControlManager.prototype.onSearch = function() { return this._search };
epiviz.ui.ControlManager.prototype._updateSeqNames = function(a) { var b = $("#chromosome-selector");
    b.empty(); for (var c = 0; c < a.length; ++c) { var d = sprintf('<option value="%s"%s>%s</option>', a[c].seqName, this._locationManager.currentLocation() && a[c].seqName == this._locationManager.currentLocation().seqName() ? 'selected="selected"' : "", a[c].seqName);
        b.append(d) }
    b.selectmenu() };
epiviz.ui.ControlManager.prototype._updateSelectedLocation = function(a) { if (a) { this._locationManager.changeCurrentLocation(a);
        a = this._locationManager.currentLocation();
        $("#text-location").val(Globalize.format(a.start(), "n0") + " - " + Globalize.format(a.end(), "n0")); var b = $("#chromosome-selector");
        b.val(a.seqName());
        b.selectmenu() } };
epiviz.ui.ControlManager.prototype.updateSelectedWorkspace = function(a) { var b = this,
        c = $("#save-workspace-text"),
        d = this._activeWorkspaceInfo;
    c.val(a.name);
    this._activeWorkspaceInfo = a;
    this._activeWorkspaceChanged.notify({ oldValue: d, newValue: a, cancel: function() { c.val(d.name);
            b._activeWorkspaceInfo = d } }) };
epiviz.ui.ControlManager.prototype._initializeChromosomeSelector = function() { var a = $("#chromosome-selector");
    a.selectmenu({ style: "popup", width: "90", maxHeight: "100", menuWidth: "90" }); var b = this;
    a.change(function() { var a = b._locationManager.lastUnfilledLocationChangeRequest() || b._locationManager.currentLocation(),
            d = $(this).val();
        b._updateSelectedLocation(new epiviz.datatypes.GenomicRange(d, a.start(), a.width())) }) };
epiviz.ui.ControlManager.prototype._initializeLocationTextbox = function() { var a = this;
    $("#text-location").keypress(function(b) { if (13 != b.which) return !0; try { var c = $(this).val().split("-"),
                d = Globalize.parseInt(c[0]),
                e = Globalize.parseInt(c[1]),
                f = a._locationManager.lastUnfilledLocationChangeRequest() || a._locationManager.currentLocation();
            a._updateSelectedLocation(epiviz.datatypes.GenomicRange.fromStartEnd(f.seqName(), d, e)); return !0 } catch (g) { return !1 } }) };
epiviz.ui.ControlManager.prototype._initializeNavigationButtons = function() {
    var a = this;
    $("#moveright").button({ icons: { primary: "ui-icon ui-icon-seek-next" }, text: !1 }).click(function() { var b = a._locationManager.lastUnfilledLocationChangeRequest() || a._locationManager.currentLocation(),
            c = b.start() + Math.round(b.width() * a._stepRatio);
        a._updateSelectedLocation(new epiviz.datatypes.GenomicRange(b.seqName(), c, b.width())) });
    $("#moveleft").button({ icons: { primary: "ui-icon ui-icon-seek-prev" }, text: !1 }).click(function() {
        var b =
            a._locationManager.lastUnfilledLocationChangeRequest() || a._locationManager.currentLocation(),
            c = b.start() - Math.round(b.width() * a._stepRatio);
        a._updateSelectedLocation(new epiviz.datatypes.GenomicRange(b.seqName(), c, b.width()))
    })
};
epiviz.ui.ControlManager.prototype._initializeZoomButtons = function() {
    var a = this,
        b = $("#zoomin");
    b.button({ icons: { primary: "ui-icon ui-icon-zoomin" }, text: !1 });
    var c = $("#zoomout");
    c.button({ icons: { primary: "ui-icon ui-icon-zoomout" }, text: !1 });
    var d = function(b) {
        var c = a._locationManager.lastUnfilledLocationChangeRequest() || a._locationManager.currentLocation(),
            d = c.start() + .5 * c.width();
        b = Math.round(c.width() * b);
        d = Math.round(d - .5 * b);
        a._updateSelectedLocation(new epiviz.datatypes.GenomicRange(c.seqName(), d,
            b))
    };
    b.click(function() { d(a._zoominRatio) });
    c.click(function() { d(a._zoomoutRatio) })
};
epiviz.ui.ControlManager.prototype._initializeLocationSettingsDialog = function() {
    var a = this;
    $("#location-settings").button({ text: !1, icons: { primary: "ui-icon ui-icon-gear" } }).click(function() { $("#location-settings-dialog").dialog("open") });
    $("#location-settings-dialog").dialog({
        autoOpen: !1,
        resizable: !1,
        width: "300",
        buttons: {
            Ok: function() { a._zoominRatio = $("#zoomin-ratio-text").val();
                a._zoomoutRatio = $("#zoomout-ratio-text").val();
                a._stepRatio = $("#navigation-step-ratio-text").val();
                $(this).dialog("close") },
            Cancel: function() { $("#zoomin-ratio-text").val(Globalize.format(a._zoominRatio, "n3"));
                $("#zoomout-ratio-text").val(Globalize.format(a._zoomoutRatio, "n3"));
                $("#navigation-step-ratio-text").val(Globalize.format(a._stepRatio, "n6"));
                $(this).dialog("close") }
        },
        modal: !0
    });
    $("#zoomout-ratio-text").spinner({ min: 1.001, max: 1E3, step: .001, start: 1.2, numberFormat: "n3" }).val(a._zoomoutRatio);
    $("#zoomin-ratio-text").spinner({ min: .001, max: .999, step: .01, start: .8, numberFormat: "n3" }).val(a._zoominRatio);
    $("#navigation-step-ratio-text").spinner({
        min: 1E-6,
        max: 1,
        step: 1E-6,
        start: .2,
        numberFormat: "n6"
    }).val(a._stepRatio)
};
epiviz.ui.ControlManager.prototype._initializeChartMenus = function() {
    var a = this,
        b = $("#vis-menu");
    $("#vis-menu-button").button({ text: !1, icons: { primary: "ui-icon ui-icon-scatterplot", secondary: "ui-icon-triangle-1-s" } }).click(function() { var a = b.is(":visible");
        $(".dropdown-menu").find(">:first-child").hide();
        a ? b.hide() : b.show().position({ my: "left top", at: "left bottom", of: this }); return !1 });
    var c = {},
        d = epiviz.ui.ControlManager.DISPLAY_TYPE_LABELS;
    this._chartFactory.foreach(function(a, b) {
        b.chartDisplayType() in
            c || (c[b.chartDisplayType()] = []);
        c[b.chartDisplayType()].push(b)
    });
    for (var e in c) c.hasOwnProperty(e) && ($(sprintf('<li class="ui-widget-header">%s</li>', d[e])).appendTo(b), c[e].forEach(function(c, d) {
        var e = sprintf("%s-menu-add-%s", c.chartDisplayType(), c.chartHtmlAttributeName());
        b.append(sprintf('<li><a href="javascript:void(0)" id="%s">Add New %s</a></li>', e, c.chartName()));
        $("#" + e).click(function() {
            var d = [];
            c.isRestrictedToSameDatasourceGroup() && d.push(new epiviz.ui.controls.DatasourceGroupWizardStep);
            c.chartDisplayType() != epiviz.ui.charts.VisualizationType.DisplayType.DATA_STRUCTURE && d.push(new epiviz.ui.controls.MeaurementsWizardStep);
            if (d.length) {
                var e = a._measurementsManager.measurements().subset(c.measurementsFilter());
                e.addAll(a._measurementsManager.measurements().map(function(a) { return a.datasource() }).subset(c.measurementsFilter()));
                (new epiviz.ui.controls.Wizard(sprintf("Add new %s", c.chartName()), { finish: function(b) { a._addChart.notify({ type: c, visConfigSelection: b }) } }, d, new epiviz.ui.controls.VisConfigSelection(e,
                    void 0, void 0, void 0, void 0, c.chartName(), c.minSelectedMeasurements()), "750", void 0, c.isRestrictedToSameDatasourceGroup())).show();
                b.hide()
            } else a._addChart.notify({ type: c, visConfigSelection: new epiviz.ui.controls.VisConfigSelection(a._measurementsManager.measurements().subset(c.measurementsFilter())) })
        })
    }));
    b.hide().menu()
};
epiviz.ui.ControlManager.prototype._initializeComputedMeasurementsMenu = function() { var a = this;
    $("#computed-measurements-button").button({ text: !1, icons: { primary: "ui-icon ui-icon-calculator" } }).click(function() {
        (new epiviz.ui.controls.ComputedMeasurementsDialog("Computed Measurements", { add: function(b) { a._measurementsManager.addMeasurement(b) }, remove: function(b) { a._measurementsManager.removeMeasurement(b) }, close: function() {} }, a._measurementsManager.measurements(), a._chartManager.chartsMeasurements())).show() }) };
epiviz.ui.ControlManager.prototype._initializeHelpButton = function() { $("#help-button").button({ text: !1, icons: { primary: "ui-icon ui-icon-help" } }).click(function() { window.open("http://epiviz.github.io/", "_blank").focus() }) };
epiviz.ui.ControlManager.prototype._initializeTutorials = function() {
    var a = $("#help-tutorials"),
        b = new epiviz.ui.tutorials,
        c = '<div class="dropdown-menu"><ul id="tutorial-list"><li class="ui-widget-header">Tutorials</li>';
    0 < b._tutorialList.length ? b._tutorialList.forEach(function(a) { c += '<li><a href="javascript:void(0);" id="' + a.id + '">' + a.name + "</a></li>" }) : c += "<li>No Tutorials available</li>";
    c += "</ul></div>";
    $(sprintf(c)).insertAfter(a);
    var d = $("#tutorial-list");
    d.hide().menu();
    a.button({
        icons: {
            primary: "ui-icon ui-icon-info",
            secondary: "ui-icon-triangle-1-s"
        },
        text: !1
    }).click(function() { d.is(":visible") ? d.hide() : d.show().position({ my: "left top", at: "left bottom", of: this }); return !1 });
    0 < b._tutorialList.length && b._tutorialList.forEach(function(a) { $("#" + a.id).click(function() {
            (new Anno(a.tutorial)).show();
            d.hide() }) })
};
epiviz.ui.ControlManager.prototype._initializeScreenshotMenu = function() {
    var a = this,
        b = $("#save-page");
    b.button({ icons: { primary: "ui-icon ui-icon-print" }, text: !1 }).click(function() {
        a._saveWorkspace.notify({ name: name, id: name == a._activeWorkspaceInfo.name ? a._activeWorkspaceInfo.id : null });
        b.append(sprintf('<div id="loading" title="printing workspace"><p>Save/Print the existing EpiViz workspace.</p><div style="position:absolute; right:15px;"><select class="screenshot-file-format"><option value="pdf" selected="selected">PDF</option><option value="png" >PNG</option></select></div></div>'));
        b.find("#loading").dialog({ resizable: !1, modal: !0, title: "Print workspace as image", buttons: { Print: function() { $(this).dialog("close"); var b = $(".screenshot-file-format option:selected").val(),
                        d = Math.floor($.now() / 1E3);
                    (new epiviz.ui.PrintManager("pagemain", "epiviz_" + d, b, a._activeWorkspaceInfo.id)).print();
                    $(this).dialog("destroy").remove() }, cancel: function() { $(this).dialog("destroy").remove() } } }).show()
    })
};
epiviz.ui.ControlManager.prototype._initializeSearchBox = function() {
    var a = this,
        b = $("#search-box");
    b.watermark("Find Gene/Probe");
    b.autocomplete({
        source: function(b, d) {
            a._search.notify({
                searchTerm: b.term,
                callback: function(a) {
                    for (var b = [], c = 0; c < a.length; ++c) b.push({
                        value: a[c].probe || a[c].gene,
                        label: a[c].probe || a[c].gene,
                        html: a[c].probe ? sprintf("<b>%s</b>, %s, [%s: %s - %s]", a[c].probe, a[c].gene, a[c].seqName, Globalize.format(a[c].start, "n0"), Globalize.format(a[c].end, "n0")) : sprintf("<b>%s</b>, [%s: %s - %s]",
                            a[c].gene, a[c].seqName, Globalize.format(a[c].start, "n0"), Globalize.format(a[c].end, "n0")),
                        range: epiviz.datatypes.GenomicRange.fromStartEnd(a[c].seqName, a[c].start, a[c].end)
                    });
                    d(b)
                }
            })
        },
        minLength: 1,
        select: function(b, d) { a._locationManager.lastUnfilledLocationChangeRequest() || a._locationManager.currentLocation(); var c = d.item.range.seqName(),
                f = Math.round(d.item.range.start() - 11 * d.item.range.width()),
                g = 22 * d.item.range.width();
            a._updateSelectedLocation(new epiviz.datatypes.GenomicRange(c, f, g)) },
        focus: function(a) { a.preventDefault() },
        open: function() {},
        close: function() {}
    }).data("autocomplete")._renderItem = function(a, b) { return $("<li></li>").data("item.autocomplete", b).append(sprintf("<a>%s</a>", b.html)).appendTo(a) }
};
epiviz.ui.ControlManager.prototype._initializeWorkspaceSaving = function() {
    var a = this,
        b = $("#save-workspace-text"),
        c = $("#save-workspace-button"),
        d = $("#revert-workspace-button"),
        e = $("#delete-workspace-button");
    c.button({ text: !1, icons: { primary: "ui-icon-disk" } }).click(function() {
        var c = null;
        try {
            var d = b.val();
            /[a-zA-Z0-9_\s]+/g.exec(d) == d ? epiviz.workspaces.UserManager.USER_STATUS.loggedIn ? a._saveWorkspace.notify({ name: d, id: d == a._activeWorkspaceInfo.name ? a._activeWorkspaceInfo.id : null }) : (c = new epiviz.ui.controls.MessageDialog("User not logged in", { Yes: function() { a._loginLinkClicked.notify() }, No: function() {} }, "You need to log in in order to save the workspace. Do you wish to log in now?", epiviz.ui.controls.MessageDialog.Icon.QUESTION), c.show()) : (c = new epiviz.ui.controls.MessageDialog("Invalid workspace name", { Ok: function() { $(this).remove() } }, "Invalid workspace name: " + d, epiviz.ui.controls.MessageDialog.Icon.ERROR), c.show())
        } catch (h) {
            c = new epiviz.ui.controls.MessageDialog("Error", { ok: function() { $(this).remove() } }, "An error occurred while trying to save workspace: " +
                h.message, epiviz.ui.controls.MessageDialog.Icon.ERROR), c.show()
        }
    });
    e.button({ text: !1, icons: { primary: "ui-icon-trash" } }).click(function(b) { epiviz.workspaces.UserManager.USER_STATUS.loggedIn && (new epiviz.ui.controls.MessageDialog("Delete active workspace", { Yes: function() { a._deleteActiveWorkspace.notify() }, No: function() {} }, "Are you sure you want to delete the active workspace?", epiviz.ui.controls.MessageDialog.Icon.QUESTION)).show() });
    d.button({ text: !1, icons: { primary: "ui-icon-arrowreturnthick-1-w" } }).click(function(b) {
        (new epiviz.ui.controls.MessageDialog("Delete active workspace", { Yes: function() { a._revertActiveWorkspace.notify() }, No: function() {} }, "Are you sure you want to revert the changes on the active workspace?", epiviz.ui.controls.MessageDialog.Icon.QUESTION)).show()
    });
    b.watermark("Save Workspace Name");
    b.autocomplete({
        source: function(b, c) { a._searchWorkspaces.notify({ searchTerm: b.term, callback: function(a) { for (var b = [], d = 0; d < a.length; ++d) b.push({ value: a[d].id, label: a[d].name, html: sprintf("<b>%s</b> %s", a[d].name, a[d].id || "") });
                    c(b) } }) },
        minLength: 0,
        select: function(c, d) {
            c.preventDefault();
            a.updateSelectedWorkspace({ id: d.item.value || b.val(), name: d.item.label })
        },
        focus: function(a) { a.preventDefault() },
        open: function() {},
        close: function() {}
    }).data("autocomplete")._renderItem = function(a, b) { return $("<li></li>").data("item.autocomplete", b).append(sprintf("<a>%s</a>", b.html)).appendTo(a) };
    b.click(function() { b.autocomplete("search", "") })
};
epiviz.ui.ControlManager.prototype._initializeLoginLink = function() { var a = this;
    $("#login-link").live({ click: function() { a._loginLinkClicked.notify() } }) };
epiviz.ui.ControlManager.prototype._initializeLayout = function() { $("body").layout({ applyDefaultStyles: !0, east__size: 390, east__minSize: 390, east__initHidden: !0, north__resizable: !1, north__initHidden: !1, south__initHidden: !0, east__initClosed: !0 }) };
epiviz.ui.ControlManager.prototype._checkBrowserCompatibility = function() { 0 < epiviz.utils.getInternetExplorerVersion() && (new epiviz.ui.controls.MessageDialog("Browser compatibility warning", { Ok: function() {} }, "EpiViz works best on Google Chrome, Apple Safari or Mozilla Firefox. Please open it using one of those browsers.", epiviz.ui.controls.MessageDialog.Icon.ERROR)).show() };
epiviz.ui.ControlManager.prototype._registerLocationChanged = function() { var a = this;
    this._locationManager.onCurrentLocationChanged().addListener(new epiviz.events.EventListener(function(b) { a._updateSelectedLocation(b.newValue) })) };
epiviz.ui.ControlManager.prototype._registerSeqInfosUpdated = function() { var a = this;
    this._locationManager.onSeqInfosUpdated().addListener(new epiviz.events.EventListener(function(b) { a._updateSeqNames(b) })) };
epiviz.ui.controls.SaveSvgAsImageDialog = function(a, b, c) {
    epiviz.ui.controls.Dialog.call(this, "Save Chart SVG as Image", a);
    this._dialog = $("#" + this._id);
    this._dialog.append('<div class="save-svg-dialog"><label class="dialog-label">Choose file format:</label><br/><br/><div style="position:absolute; right:15px;"><select class="svg-file-format"><option value="pdf" selected="selected">PDF</option><option value="ps" >PS</option><option value="png" >PNG</option><option value="svg">SVG</option><option value="eps">EPS</option></select></div>' +
        sprintf('<form name="%s-svg-save-form" method="POST">', this._id) + '<div><input type="hidden" name="svg" /><input type="hidden" name="format" /><br/><br/></div></form></div>');
    this._chartId = b;
    this._chartSaverLocation = c;
    var d = this;
    this._dialog.dialog({
        autoOpen: !1,
        resizable: !1,
        width: "200",
        buttons: {
            Ok: function() {
                var a = $("#" + d._chartId).find("svg").clone();
                a.attr("xmlns", "http://www.w3.org/2000/svg");
                a.attr("version", "1.1");
                var b = d._dialog.find(".svg-file-format"),
                    c = document.forms[sprintf("%s-svg-save-form",
                        d._id)];
                c.action = d._chartSaverLocation;
                c.svg.value = $("<div>").append(a).html();
                c.format.value = b.val();
                c.submit();
                d._handlers.ok();
                $(this).dialog("close")
            },
            Cancel: function() { d._handlers.cancel();
                $(this).dialog("close") }
        },
        modal: !0
    })
};
epiviz.ui.controls.SaveSvgAsImageDialog.prototype = epiviz.utils.mapCopy(epiviz.ui.controls.Dialog.prototype);
epiviz.ui.controls.SaveSvgAsImageDialog.constructor = epiviz.ui.controls.SaveSvgAsImageDialog;
epiviz.ui.controls.SaveSvgAsImageDialog.prototype.show = function() { epiviz.ui.controls.Dialog.prototype.show.call(this); var a = this;
    this._dialog && (this._dialog.dialog("open"), this._dialog.dialog("option", "position", "center"), this._dialog.dialog({ close: function(b, c) { $(this).remove();
            a._dialog = null } })) };
epiviz.ui.charts.decoration = {};
epiviz.ui.charts.decoration.VisualizationDecoration = function(a, b, c) { this._visualization = a;
    this._otherDecoration = b;
    this._config = c };
epiviz.ui.charts.decoration.VisualizationDecoration.prototype.decorate = function() { this._otherDecoration && this._otherDecoration.decorate() };
epiviz.ui.charts.decoration.VisualizationDecoration.prototype.visualization = function() { return this._visualization };
epiviz.ui.charts.decoration.VisualizationDecoration.prototype.otherDecoration = function() { return this._otherDecoration };
epiviz.ui.charts.decoration.VisualizationDecoration.prototype.config = function() { return this._config };
epiviz.ui.charts.decoration.ChartOptionButton = function(a, b, c) { epiviz.ui.charts.decoration.VisualizationDecoration.call(this, a, b, c);
    this.isChartOptionButton = !0 };
epiviz.ui.charts.decoration.ChartOptionButton.prototype = epiviz.utils.mapCopy(epiviz.ui.charts.decoration.VisualizationDecoration.prototype);
epiviz.ui.charts.decoration.ChartOptionButton.constructor = epiviz.ui.charts.decoration.ChartOptionButton;
epiviz.ui.charts.decoration.ChartOptionButton.prototype.decorate = function() { epiviz.ui.charts.decoration.VisualizationDecoration.prototype.decorate.call(this); if (this.isChartOptionButton) { for (var a = 0, b = this.otherDecoration(); b; b = b.otherDecoration()) b.isChartOptionButton && ++a; var c = $(sprintf('<button style="position: absolute; top: 5px; right: %spx">%s</button>', 5 + 30 * a, this._text())).appendTo(this.visualization().container()).button(this._renderOptions()).click(this._click());
        this.visualization().container().mousemove(function() { c.show() }).mouseleave(function() { c.hide() }) } };
epiviz.ui.charts.decoration.ChartOptionButton.prototype._click = function() { return function() {} };
epiviz.ui.charts.decoration.ChartOptionButton.prototype._renderOptions = function() { return {} };
epiviz.ui.charts.decoration.ChartOptionButton.prototype._text = function() { return "" };
epiviz.ui.charts.decoration.RemoveChartButton = function(a, b) { epiviz.ui.charts.decoration.ChartOptionButton.call(this, a, b) };
epiviz.ui.charts.decoration.RemoveChartButton.prototype = epiviz.utils.mapCopy(epiviz.ui.charts.decoration.ChartOptionButton.prototype);
epiviz.ui.charts.decoration.RemoveChartButton.constructor = epiviz.ui.charts.decoration.RemoveChartButton;
epiviz.ui.charts.decoration.RemoveChartButton.prototype._click = function() { var a = this; return function() { a.visualization().onRemove().notify(new epiviz.ui.charts.VisEventArgs(a.visualization().id())) } };
epiviz.ui.charts.decoration.RemoveChartButton.prototype._renderOptions = function() { return { icons: { primary: "ui-icon ui-icon-cancel" }, text: !1 } };
epiviz.ui.charts.decoration.RemoveChartButton.prototype._text = function() { return "Remove" };
epiviz.ui.charts.decoration.SaveChartButton = function(a, b) { epiviz.ui.charts.decoration.ChartOptionButton.call(this, a, b) };
epiviz.ui.charts.decoration.SaveChartButton.prototype = epiviz.utils.mapCopy(epiviz.ui.charts.decoration.ChartOptionButton.prototype);
epiviz.ui.charts.decoration.SaveChartButton.constructor = epiviz.ui.charts.decoration.SaveChartButton;
epiviz.ui.charts.decoration.SaveChartButton.prototype._click = function() { var a = this; return function() { a.visualization().onSave().notify(new epiviz.ui.charts.VisEventArgs(a.visualization().id())) } };
epiviz.ui.charts.decoration.SaveChartButton.prototype._renderOptions = function() { return { icons: { primary: "ui-icon ui-icon-disk" }, text: !1 } };
epiviz.ui.charts.decoration.SaveChartButton.prototype._text = function() { return "Save" };
epiviz.ui.controls.CustomSettingsDialog = function(a, b, c, d) { epiviz.ui.controls.Dialog.call(this, a, b);
    this._customSettingsDefs = c;
    this._customSettingsValues = epiviz.utils.mapCopy(d) };
epiviz.ui.controls.CustomSettingsDialog.prototype = epiviz.utils.mapCopy(epiviz.ui.controls.Dialog.prototype);
epiviz.ui.controls.CustomSettingsDialog.constructor = epiviz.ui.controls.CustomSettingsDialog;
epiviz.ui.controls.CustomSettingsDialog.prototype.show = function() {
    epiviz.ui.controls.Dialog.prototype.show.call(this);
    var a = epiviz.ui.charts.CustomSetting.Type;
    if (!this._dialog) {
        var b = this;
        this._dialog = $("#" + this._id);
        this._dialog.css("display", "inline");
        var c, d, e, f, g = "";
        for (c = 0; c < this._customSettingsDefs.length; ++c) {
            d = sprintf("%s-%s", this._id, this._customSettingsDefs[c].id);
            var h = sprintf('<tr><td><label for="%s">%s</label></td><td style="text-align: right;">%%s</td></tr>', d, this._customSettingsDefs[c].label);
            e = null;
            f = this._customSettingsValues[this._customSettingsDefs[c].id];
            switch (this._customSettingsDefs[c].type) {
                case a.BOOLEAN:
                    h = sprintf(h, sprintf('<div id="%1$s"><label for="%1$s-true">On</label><input type="radio" id="%1$s-true" name="%1$s" %2$s /><label for="%1$s-false">Off</label><input type="radio" id="%1$s-false" name="%1$s" %3$s /></div>', d, f ? 'checked="checked"' : "", f ? "" : 'checked="checked"'));
                    break;
                case a.ARRAY:
                    h = sprintf(h, sprintf('<input id="%s" value="%s" class="ui-widget-content ui-corner-all" style="text-align: right; padding: 5px;" />',
                        d, f.join(",")));
                    break;
                case a.NUMBER:
                case a.STRING:
                    h = sprintf(h, sprintf('<input id="%s" value="%s" class="ui-widget-content ui-corner-all" style="text-align: right; padding: 5px;" />', d, f));
                    break;
                case a.CATEGORICAL:
                case a.MEASUREMENTS_METADATA:
                case a.MEASUREMENTS_ANNOTATION:
                    var m = "",
                        l = this._customSettingsDefs[c];
                    if (l.possibleValues)
                        for (var n = 0; n < l.possibleValues.length; ++n) m += sprintf('<option value="%1$s"%2$s>%1$s</option>', l.possibleValues[n], l.possibleValues[n] == f ? 'selected="selected"' : "");
                    f = sprintf('<select id="%s">%s</select>',
                        d, m);
                    h = sprintf(h, f)
            }
            g += h
        }
        g = sprintf('<div style="margin: 5px; padding: 5px; height: auto;"><table style="width: 100%%;">%s</table></div>', g);
        this._dialog.append(g);
        for (c = 0; c < this._customSettingsDefs.length; ++c) switch (d = sprintf("%s-%s", this._id, this._customSettingsDefs[c].id), e = $("#" + d), f = this._customSettingsValues[this._customSettingsDefs[c].id], this._customSettingsDefs[c].type) {
            case a.BOOLEAN:
                e.buttonset();
                break;
            case a.NUMBER:
            case a.ARRAY:
            case a.STRING:
                e.watermark(this._customSettingsDefs[c].label);
                break;
            case a.CATEGORICAL:
            case a.MEASUREMENTS_METADATA:
            case a.MEASUREMENTS_ANNOTATION:
                e.selectmenu()
        }
        this._dialog.dialog({
            autoOpen: !1,
            resizable: !1,
            buttons: {
                Ok: function() {
                    for (var c = 0; c < b._customSettingsDefs.length; ++c) {
                        d = sprintf("%s-%s", b._id, b._customSettingsDefs[c].id);
                        e = $("#" + d);
                        var f = null;
                        if (e.val() == epiviz.ui.charts.CustomSetting.DEFAULT) f = b._customSettingsDefs[c].defaultValue;
                        else {
                            var g = null;
                            try {
                                switch (b._customSettingsDefs[c].type) {
                                    case a.BOOLEAN:
                                        var h = $("#" + d + " :radio:checked").attr("id"),
                                            f =
                                            "true" == h.substr(h.lastIndexOf("-") + 1);
                                        break;
                                    case a.NUMBER:
                                        f = e.val() == epiviz.ui.charts.CustomSetting.DEFAULT ? b._customSettingsDefs[c].defaultValue : parseFloat(e.val());
                                        if (isNaN(f)) { g = new epiviz.ui.controls.MessageDialog("Invalid property value", { Ok: function() {} }, sprintf('Invalid value for setting "%s" (%s)', b._customSettingsDefs[c].label, b._customSettingsDefs[c].id), epiviz.ui.controls.MessageDialog.Icon.ERROR);
                                            g.show(); return }
                                        break;
                                    case a.ARRAY:
                                        f = e.val().split(/[\s,]+/g);
                                        break;
                                    case a.STRING:
                                    case a.CATEGORICAL:
                                    case a.MEASUREMENTS_METADATA:
                                    case a.MEASUREMENTS_ANNOTATION:
                                        f =
                                            e.val()
                                }
                            } catch (u) { g = new epiviz.ui.controls.MessageDialog("Invalid property value", { Ok: function() {} }, sprintf('Invalid value for setting "%s" (%s)', b._customSettingsDefs[c].label, b._customSettingsDefs[c].id), epiviz.ui.controls.MessageDialog.Icon.ERROR);
                                g.show(); return }
                        }
                        b._customSettingsValues[b._customSettingsDefs[c].id] = f
                    }
                    b._handlers.ok(b._customSettingsValues);
                    $(this).dialog("close")
                },
                Cancel: function() { b._handlers.cancel();
                    $(this).dialog("close") }
            },
            modal: !0
        });
        this._dialog.dialog({
            close: function(a,
                c) { $(this).remove();
                b._dialog = null }
        })
    }
    this._dialog.dialog("open");
    this._dialog.dialog("option", "position", "center")
};
epiviz.ui.charts.decoration.CustomSettingsButton = function(a, b) { epiviz.ui.charts.decoration.ChartOptionButton.call(this, a, b) };
epiviz.ui.charts.decoration.CustomSettingsButton.prototype = epiviz.utils.mapCopy(epiviz.ui.charts.decoration.ChartOptionButton.prototype);
epiviz.ui.charts.decoration.CustomSettingsButton.constructor = epiviz.ui.charts.decoration.CustomSettingsButton;
epiviz.ui.charts.decoration.CustomSettingsButton.prototype._click = function() { var a = this; return function() {
        (new epiviz.ui.controls.CustomSettingsDialog("Edit custom settings", { ok: function(b) { a.visualization().setCustomSettingsValues(b) }, cancel: function() {} }, a.visualization().properties().customSettingsDefs, a.visualization().customSettingsValues())).show() } };
epiviz.ui.charts.decoration.CustomSettingsButton.prototype._renderOptions = function() { return { icons: { primary: "ui-icon ui-icon-gear" }, text: !1 } };
epiviz.ui.charts.decoration.CustomSettingsButton.prototype._text = function() { return "Custom settings" };
epiviz.ui.controls.CodeDialog = function(a, b, c) {
    epiviz.ui.controls.Dialog.call(this, a, b);
    this._controlCreators = c;
    this._dialog = $("#" + this._id);
    this._controls = [];
    var d = this;
    this._dialog.append('<div class="code-tabs"><ul></ul></div>');
    var e = this._dialog.find(".code-tabs"),
        f = e.find("ul");
    this._controlCreators.forEach(function(a, b) { var c = d._id + "-code-tab-" + b;
        e.append(sprintf('<div id="%s"></div>', c)); var g = e.find("#" + c),
            g = a(g);
        f.append(sprintf('<li><a href="#%s">%s</a></li>', c, g.title()));
        d._controls.push(g) });
    e.tabs({ activate: function(a, b) { d._tabActivate(e) } });
    this._dialog.dialog({ autoOpen: !1, resizable: !1, width: "800", buttons: { Save: function() { var a = [];
                d._controls.forEach(function(b) { b.save();
                    a.push(b.result()) });
                d._handlers.save(a);
                $(this).dialog("close") }, Cancel: function() { d._controls.forEach(function(a) { a.revert() });
                d._handlers.cancel();
                $(this).dialog("close") } }, modal: !0 });
    this._dialog.dialog("option", "position", "center")
};
epiviz.ui.controls.CodeDialog.prototype = epiviz.utils.mapCopy(epiviz.ui.controls.Dialog.prototype);
epiviz.ui.controls.CodeDialog.constructor = epiviz.ui.controls.CodeDialog;
epiviz.ui.controls.CodeDialog.prototype.show = function() { epiviz.ui.controls.Dialog.prototype.show.call(this);
    this._dialog.dialog("open");
    this._controls[0].initialize();
    this._dialog.dialog("option", "position", "center") };
epiviz.ui.controls.CodeDialog.prototype._tabActivate = function(a) { a = a.tabs("option", "active");
    this._controls[a].initialize();
    this._dialog.dialog("option", "position", "center") };
epiviz.ui.charts.decoration.CodeButton = function(a, b, c) { epiviz.ui.charts.decoration.ChartOptionButton.call(this, a, b, c);
    this.isCodeButton = !0;
    this._controlCreators = [];
    a = !0; var d; for (b = this.otherDecoration(); b; b = b.otherDecoration()) b.isCodeButton && (a = !1, d = b);
    d && d._addControlCreator(this._controlCreator(), this._saveHandler(), this._cancelHandler());
    (this.isChartOptionButton = a) && this._addControlCreator(this._controlCreator(), this._saveHandler(), this._cancelHandler()) };
epiviz.ui.charts.decoration.CodeButton.prototype = epiviz.utils.mapCopy(epiviz.ui.charts.decoration.ChartOptionButton.prototype);
epiviz.ui.charts.decoration.CodeButton.constructor = epiviz.ui.charts.decoration.CodeButton;
epiviz.ui.charts.decoration.CodeButton.prototype._click = function() { var a = this; return function() {
        (new epiviz.ui.controls.CodeDialog("Chart Code", { save: function(b) { b.forEach(function(b, d) { a._controlCreators[d].save(b) }) }, cancel: function() { a._controlCreators.forEach(function(a) { a.cancel() }) } }, a._controlCreators.map(function(a) { return a.creator }))).show() } };
epiviz.ui.charts.decoration.CodeButton.prototype._renderOptions = function() { return { icons: { primary: "ui-icon ui-icon-pencil" }, text: !1 } };
epiviz.ui.charts.decoration.CodeButton.prototype._text = function() { return "Code" };
epiviz.ui.charts.decoration.CodeButton.prototype._addControlCreator = function(a, b, c) { this._controlCreators.push({ creator: a, save: b, cancel: c }) };
epiviz.ui.charts.decoration.CodeButton.prototype._controlCreator = function() { return null };
epiviz.ui.charts.decoration.CodeButton.prototype._saveHandler = function() { return null };
epiviz.ui.charts.decoration.CodeButton.prototype._cancelHandler = function() { return null };
epiviz.ui.controls.CodeControl = function(a, b, c, d) { epiviz.ui.controls.Control.call(this, a, b, c);
    this._targetObj = d;
    this._text = "// TODO: Your code here\n" };
epiviz.ui.controls.CodeControl.prototype = epiviz.utils.mapCopy(epiviz.ui.controls.Control.prototype);
epiviz.ui.controls.CodeControl.constructor = epiviz.ui.controls.CodeControl;
epiviz.ui.controls.CodeControl.prototype.initialize = function() {};
epiviz.ui.controls.CodeControl.prototype.save = function() {};
epiviz.ui.controls.CodeControl.prototype.revert = function() {};
epiviz.ui.controls.CodeControl.prototype.text = function() { return this._text };
epiviz.ui.controls.CodeControl.prototype.result = function() { return null };
epiviz.ui.controls.EditCodeControl = function(a, b, c, d, e, f) { epiviz.ui.controls.CodeControl.call(this, a, b, c, d);
    this._defaultMethod = e;
    this._editor = null;
    this._methodsCode = {};
    this._selectedMethod = null;
    this._hasModifiedMethods = f || !1 };
epiviz.ui.controls.EditCodeControl.prototype = epiviz.utils.mapCopy(epiviz.ui.controls.CodeControl.prototype);
epiviz.ui.controls.EditCodeControl.constructor = epiviz.ui.controls.EditCodeControl;
epiviz.ui.controls.EditCodeControl.prototype.initialize = function() {
    if (!this._editor) {
        this._container.append('<div style="float: left; margin-right: 5px;"><select class="obj-methods"></select></div>' + sprintf('<div id="%1$s"><label for="%1$s-true">On</label><input type="radio" id="%1$s-true" name="%1$s" %2$s /><label for="%1$s-false">Off</label><input type="radio" id="%1$s-false" name="%1$s" %3$s /></div>', this.id() + "-switch", this._hasModifiedMethods ? 'checked="checked"' : "", this._hasModifiedMethods ?
            "" : 'checked="checked"') + '<br /><div style="overflow-y: scroll; max-height: 500px;"><textarea autofocus="autofocus" class="code-edit"></textarea></div>');
        this._methodsSelector = this._container.find(".obj-methods");
        var a = this._container.find("#" + this.id() + "-switch");
        a.buttonset();
        var b = this,
            c = function(a) { a = $("#" + b.id() + "-switch :radio:checked").attr("id");
                a = "true" == a.substr(a.lastIndexOf("-") + 1);
                b._editor && b._editor.setOption("disableInput", !a);
                b._hasModifiedMethods = a };
        a.find("#" + this.id() + "-switch-true").on("change",
            c);
        a.find("#" + this.id() + "-switch-false").on("change", c);
        var d = this._container.find(".code-edit"),
            a = [],
            c = this._targetObj,
            e;
        for (e in c) $.isFunction(c[e]) && a.push(e);
        a.sort();
        for (var f = 0; f < a.length; ++f) { e = a[f]; var g = 0 == f && !this._defaultMethod || this._defaultMethod == e;
            this._methodsSelector.append(sprintf('<option value="%s"%s>%s</option>', e, g ? ' selected="selected"' : "", e));
            g && (this._text = c[e].toString(), this._selectedMethod = e) }
        this._methodsSelector.change(function() {
            b._methodsCode[b._selectedMethod] = b._editor.getValue();
            var a = $(this).val(),
                c = b._methodsCode[a];
            c || (c = b._targetObj[a].toString(), b._methodsCode[a] = c);
            b._text = c;
            b._editor ? b._editor.getDoc().setValue(b._text) : d.val(b._text);
            b._selectedMethod = a
        });
        d.val(this._text);
        this._methodsSelector.selectmenu({ style: "popup", width: "150", maxHeight: "150", menuWidth: "150" });
        this._editor = CodeMirror.fromTextArea(this._container.find(".code-edit")[0], { lineNumbers: !0, matchBrackets: !0, continueComments: "Enter", extraKeys: { "Ctrl-Q": "toggleComment" }, autofocus: !0 });
        this._editor.setOption("disableInput", !this._hasModifiedMethods)
    }
};
epiviz.ui.controls.EditCodeControl.prototype.save = function() { this._methodsCode[this._selectedMethod] = this._editor.getValue();
    this._text = this._editor.getValue() };
epiviz.ui.controls.EditCodeControl.prototype.revert = function() { this._editor && this._editor.setOption("value", this._text) };
epiviz.ui.controls.EditCodeControl.prototype.modifiedMethods = function() { var a = {},
        b; for (b in this._methodsCode) this._methodsCode.hasOwnProperty(b) && this._methodsCode[b] != this._targetObj[b].toString() && (a[b] = this._methodsCode[b]); return a };
epiviz.ui.controls.EditCodeControl.prototype.result = function() { return { hasModifiedMethods: this._hasModifiedMethods, modifiedMethods: this._hasModifiedMethods ? this.modifiedMethods() : {} } };
epiviz.ui.charts.decoration.EditCodeButton = function(a, b, c) { epiviz.ui.charts.decoration.CodeButton.call(this, a, b, c) };
epiviz.ui.charts.decoration.EditCodeButton.prototype = epiviz.utils.mapCopy(epiviz.ui.charts.decoration.CodeButton.prototype);
epiviz.ui.charts.decoration.EditCodeButton.constructor = epiviz.ui.charts.decoration.EditCodeButton;
epiviz.ui.charts.decoration.EditCodeButton.prototype._controlCreator = function() { var a = this; return function(b) { return new epiviz.ui.controls.EditCodeControl(b, "Edit Code", null, a.visualization(), a.visualization().lastModifiedMethod(), a.visualization().hasModifiedMethods()) } };
epiviz.ui.charts.decoration.EditCodeButton.prototype._saveHandler = function() { var a = this; return function(b) { b.hasModifiedMethods ? a.visualization().setModifiedMethods(b.modifiedMethods) : a.visualization().resetModifiedMethods() } };
epiviz.ui.charts.decoration.EditCodeButton.prototype._cancelHandler = function() { return function() {} };
epiviz.ui.controls.ColorPickerDialog = function(a, b, c, d) {
    epiviz.ui.controls.Dialog.call(this, "Pick Colors", a);
    this._dialog = $("#" + this._id);
    this._dialog.append('<div class="color-picker-form" action="" style="width: 420px;"><div class="chart-picker" style="float: right;"></div></div>');
    var e = this._dialog.find(".color-picker-form");
    a = "";
    for (var f = 0; f < b.length; ++f) {
        var g = sprintf("color-%s", f);
        a += sprintf('<tr><td><label>%s:&nbsp;</label></td><td><input type="text" name="%s" class="colorwell %s" value="%s" /></td></tr>',
            b[f], g, g, 0 <= d.keyColorIndex(b[f]) ? d.getByKey(b[f]) : d.get(f))
    }
    e.append(sprintf('<table class="color-picker-table">%s</table>', a));
    var h = $.farbtastic(sprintf("#%s .chart-picker", this._id)),
        m = $(sprintf("#%s .chart-picker", this._id)).css("opacity", .25),
        l;
    $(sprintf("#%s .colorwell", this._id)).each(function() { h.linkTo(this);
        $(this).css("opacity", .75) }).focus(function() { l && $(l).css("opacity", .75).removeClass("colorwell-selected");
        h.linkTo(this);
        m.css("opacity", 1);
        $(l = this).css("opacity", 1).addClass("colorwell-selected") });
    e.append('<select class="palettes-selector"></select>');
    var n = e.find(".palettes-selector"),
        p = {};
    c && c.forEach(function(a) { n.append(sprintf('<option value="%s"%s>%s</option>', a.id(), a.id() == d.id() ? ' selected="selected"' : "", a.name()));
        p[a.id()] = a });
    d.id() in p || (n.prepend(sprintf('<option value="%s" selected="selected">%s</option>', d.id(), d.name())), p[d.id()] = d);
    n.selectmenu({ style: "popup", width: "200", maxHeight: "150", menuWidth: "200" });
    var t = function() {
        for (var a = e.find(".colorwell"), b = 0; b < a.length; ++b) h.linkTo($(a[b])),
            h.setColor(d.get(b));
        l && h.linkTo(l)
    };
    n.change(function() { d = p[$(this).val()];
        t() });
    var r = this;
    this._dialog.dialog({
        autoOpen: !1,
        resizable: !1,
        width: "440",
        buttons: {
            Ok: function() { var a = e.find(".colorwell"),
                    c = !1,
                    f = [],
                    g; for (g = 0; g < d.size(); ++g) f.push(d.get(g)); for (g = 0; g < a.length; ++g) { var h = a[g].value,
                        l = d.keyColorIndex(b[g]);
                    0 > l && (l = g);
                    h != f[l] && (c = !0, f[l] = h) }
                c && (d = new epiviz.ui.charts.ColorPalette(f, void 0, void 0, d.keyIndices()));
                r._handlers.ok(d);
                $(this).dialog("close") },
            Cancel: function() {
                r._handlers.cancel();
                $(this).dialog("close")
            },
            Reset: function() { t();
                r._handlers.reset() }
        },
        modal: !0
    })
};
epiviz.ui.controls.ColorPickerDialog.prototype = epiviz.utils.mapCopy(epiviz.ui.controls.Dialog.prototype);
epiviz.ui.controls.ColorPickerDialog.constructor = epiviz.ui.controls.ColorPickerDialog;
epiviz.ui.controls.ColorPickerDialog.prototype.show = function() { epiviz.ui.controls.Dialog.prototype.show.call(this); var a = this;
    this._dialog && (this._dialog.dialog("open"), this._dialog.dialog("option", "position", "center"), this._dialog.dialog({ close: function(b, c) { $(this).remove();
            a._dialog = null } })) };
epiviz.ui.charts.decoration.ChartColorsButton = function(a, b, c) { epiviz.ui.charts.decoration.ChartOptionButton.call(this, a, b, c) };
epiviz.ui.charts.decoration.ChartColorsButton.prototype = epiviz.utils.mapCopy(epiviz.ui.charts.decoration.ChartOptionButton.prototype);
epiviz.ui.charts.decoration.ChartColorsButton.constructor = epiviz.ui.charts.decoration.ChartColorsButton;
epiviz.ui.charts.decoration.ChartColorsButton.prototype._click = function() { var a = this; return function() { var b = a.visualization().colorLabels();
        (new epiviz.ui.controls.ColorPickerDialog({ ok: function(b) { a.visualization().setColors(b) }, cancel: function() {}, reset: function() {} }, b, a.config().colorPalettes, a.visualization().colors())).show() } };
epiviz.ui.charts.decoration.ChartColorsButton.prototype._renderOptions = function() { return { icons: { primary: "ui-icon ui-icon-colorpicker" }, text: !1 } };
epiviz.ui.charts.decoration.ChartColorsButton.prototype._text = function() { return "Colors" };
epiviz.ui.charts.decoration.ChartLoaderAnimation = function(a, b) { epiviz.ui.charts.decoration.VisualizationDecoration.call(this, a, b);
    this._loaderTimeout = 0;
    this._animationShowing = !1 };
epiviz.ui.charts.decoration.ChartLoaderAnimation.prototype = epiviz.utils.mapCopy(epiviz.ui.charts.decoration.VisualizationDecoration.prototype);
epiviz.ui.charts.decoration.ChartLoaderAnimation.constructor = epiviz.ui.charts.decoration.ChartLoaderAnimation;
epiviz.ui.charts.decoration.ChartLoaderAnimation.prototype.decorate = function() {
    epiviz.ui.charts.decoration.VisualizationDecoration.prototype.decorate.call(this);
    var a = this;
    this.visualization().onDataWaitStart().addListener(new epiviz.events.EventListener(function() { a._addLoaderAnimation() }));
    this.visualization().onDataWaitEnd().addListener(new epiviz.events.EventListener(function() { a._removeLoaderAnimation() }));
    this.visualization().onSizeChanged().addListener(new epiviz.events.EventListener(function() {
        a._animationShowing &&
            a._addLoaderAnimation()
    }))
};
epiviz.ui.charts.decoration.ChartLoaderAnimation.prototype._addLoaderAnimation = function() {
    this._loaderTimeout && clearTimeout(this._loaderTimeout);
    var a = function() {
            b._animationShowing = !0;
            var a = b.visualization(),
                d = a.container();
            d.find(".chart-loader").remove();
            d.append(sprintf('<div class="loader-icon %s" style="top: %spx; left: %spx;"></div>', "chart-loader", Math.floor(.5 * a.height()), Math.floor(.5 * a.width())));
            d.find(".chart-loader").activity({
                segments: 8,
                steps: 5,
                opacity: .3,
                width: 4,
                space: 0,
                length: 10,
                color: "#0b0b0b",
                speed: 1
            })
        },
        b = this;
    this._animationShowing ? a() : this._loaderTimeout = setTimeout(a, 500)
};
epiviz.ui.charts.decoration.ChartLoaderAnimation.prototype._removeLoaderAnimation = function() { this._loaderTimeout && clearTimeout(this._loaderTimeout);
    this._animationShowing = !1;
    this.visualization().container().find(".chart-loader").remove() };
epiviz.ui.charts.decoration.ChartResize = function(a, b) { epiviz.ui.charts.decoration.VisualizationDecoration.call(this, a, b) };
epiviz.ui.charts.decoration.ChartResize.prototype = epiviz.utils.mapCopy(epiviz.ui.charts.decoration.VisualizationDecoration.prototype);
epiviz.ui.charts.decoration.ChartResize.constructor = epiviz.ui.charts.decoration.ChartResize;
epiviz.ui.charts.decoration.ChartResize.prototype.decorate = function() { epiviz.ui.charts.decoration.VisualizationDecoration.prototype.decorate.call(this); var a = this;
    this.visualization().container().resizable({ stop: function(b, c) { a.visualization().updateSize() } }) };
epiviz.ui.charts.decoration.ToggleTooltipButton = function(a, b) { epiviz.ui.charts.decoration.VisualizationDecoration.call(this, a, b);
    this.isChartOptionButton = !0;
    this._checked = !1 };
epiviz.ui.charts.decoration.ToggleTooltipButton.prototype = epiviz.utils.mapCopy(epiviz.ui.charts.decoration.VisualizationDecoration.prototype);
epiviz.ui.charts.decoration.ToggleTooltipButton.constructor = epiviz.ui.charts.decoration.ToggleTooltipButton;
epiviz.ui.charts.decoration.ToggleTooltipButton.prototype.decorate = function() {
    epiviz.ui.charts.decoration.VisualizationDecoration.prototype.decorate.call(this);
    for (var a = 0, b = this.otherDecoration(); b; b = b.otherDecoration()) b.isChartOptionButton && ++a;
    var c = this,
        b = sprintf("%s-tooltip-button", this.visualization().id());
    this.visualization().container().append(sprintf('<div id="%1$s-container" style="position: absolute; top: 5px; right: %2$spx"><input type="checkbox" id="%1$s" %3$s /><label for="%1$s" >Toggle tooltip</label></div>',
        b, 5 + 30 * a, this._checked ? 'checked="checked"' : ""));
    var d = $("#" + b),
        e = $("#" + b + "-container");
    d.button({ text: !1, icons: { primary: "ui-icon-comment" } }).click(function() { c._checked = d.is(":checked") });
    this.visualization().container().mousemove(function() { e.show() }).mouseleave(function() { e.hide() })
};
epiviz.ui.charts.decoration.ToggleTooltipButton.prototype.checked = function() { return this._checked };
epiviz.ui.charts.decoration.ChartTooltip = function(a, b) { epiviz.ui.charts.decoration.VisualizationDecoration.call(this, a, b) };
epiviz.ui.charts.decoration.ChartTooltip.prototype = epiviz.utils.mapCopy(epiviz.ui.charts.decoration.VisualizationDecoration.prototype);
epiviz.ui.charts.decoration.ChartTooltip.constructor = epiviz.ui.charts.decoration.ChartTooltip;
epiviz.ui.charts.decoration.ChartTooltip.prototype.decorate = function() {
    epiviz.ui.charts.decoration.VisualizationDecoration.prototype.decorate.call(this);
    for (var a = void 0, b = this.otherDecoration(); b; b = b.otherDecoration())
        if (b.constructor == epiviz.ui.charts.decoration.ToggleTooltipButton) { a = b; break }
    var c = this;
    this.visualization().container().tooltip({
        items: ".item",
        content: function() {
            if (!a.checked()) return !1;
            var b = d3.select(this).data()[0];
            return b.valueItems[0].length > b.measurements.length + b.measurements[0].metadata().length ?
                c._horizontalContent(b) : c._verticalContent(b)
        },
        track: !0,
        show: !1
    })
};
epiviz.ui.charts.decoration.ChartTooltip.prototype._horizontalContent = function(a) {
    for (var b = a.measurements[0].metadata(), c = sprintf("%s%s%s", void 0 != a.start && void 0 != a.end ? "<th><b>Start</b></th><th><b>End</b></th>" : "", b ? "<th><b>" + b.join("</b></th><th><b>") + "</b></th>" : "", a.values ? "<th><b>" + a.measurements.join("</b></th><th><b>") + "</b></th>" : ""), d = "", e = 0; e < a.valueItems[0].length && 10 > e; ++e) {
        var f = "",
            g = a.valueItems[0][e].rowItem,
            h = Globalize.format(g.start(), "n0"),
            m = Globalize.format(g.end(), "n0");
        void 0 !=
            h && void 0 != m && (f += sprintf("<td>%s</td><td>%s</td>", h, m));
        g = g.rowMetadata();
        if (b && g)
            for (h = 0; h < b.length; ++h) m = g[b[h]] || "", f += sprintf("<td>%s</td>", 15 >= m.length ? m : m.substr(0, 15) + "...");
        if (a.values)
            for (g = 0; g < a.measurements.length; ++g) f += sprintf("<td>%s</td>", Globalize.format(a.valueItems[g][e].value, "n3"));
        d += sprintf("<tr>%s</tr>", f)
    }
    e < a.valueItems[0].length && (d += sprintf('<tr><td colspan="%s" style="text-align: center;">...</td></tr>', 2 + (b ? b.length : 0) + (a.values ? a.measurements.length : 0)));
    return sprintf('<table class="tooltip-table"><thead><tr>%s</tr></thead><tbody>%s</tbody></table>',
        c, d)
};
epiviz.ui.charts.decoration.ChartTooltip.prototype._verticalContent = function(a) {
    var b = [],
        c = [0, 0];
    if (void 0 != a.start && void 0 != a.end) { var d = ["Start"],
            e = ["End"];
        a.valueItems[0].every(function(a, b) { d.push(Globalize.format(a.rowItem.start(), "n0"));
            e.push(Globalize.format(a.rowItem.end(), "n0")); return 5 > b });
        b.push(d);
        b.push(e);
        c = [0, 2] }
    var f = a.measurements[0].metadata(),
        g = [c[1], c[1] + f.length];
    f.forEach(function(c) {
        var d = [c];
        a.valueItems[0].every(function(a, b) {
            var e = a.rowItem.metadata(c) || "[NA]";
            15 < e.length &&
                (e = e.substr(0, 15) + "...");
            d.push(e);
            return 5 > b
        });
        b.push(d)
    });
    f = [g[1], g[1]];
    a.values && (f = [g[1], g[1] + a.measurements.length], a.measurements.forEach(function(c, d) { var e = [c.name()];
        a.valueItems[d].every(function(a, b) { e.push(Globalize.format(a.value, "n3")); return 5 > b });
        b.push(e) }));
    var h = f[1];
    10 < h && (c[1] = 1, g[1] = Math.min(g[1], g[0] + 4), h = c[1] - c[0] + g[1] - g[0] + f[1] - f[0], 10 < h && (f[1] -= h - 10));
    var h = "",
        m;
    for (m = c[0]; m < c[1]; ++m) h += "<tr><td><b>" + b[m][0] + "</b></td><td>" + b[m].slice(1).join("</td><td>") + "</td></tr>";
    for (m =
        g[0]; m < g[1]; ++m) h += "<tr><td><b>" + b[m][0] + "</b></td><td>" + b[m].slice(1).join("</td><td>") + "</td></tr>";
    for (m = f[0]; m < f[1]; ++m) h += "<tr><td><b>" + b[m][0] + "</b></td><td>" + b[m].slice(1).join("</td><td>") + "</td></tr>";
    return '<table class="tooltip-table"><tbody>' + h + "</tbody></table>"
};
epiviz.ui.controls.MarkerCodeControl = function(a, b, c, d, e, f, g) { epiviz.ui.controls.CodeControl.call(this, a, b, c, d);
    this._markEditor = this._editor = null;
    this._editorText = e;
    this._markText = f;
    this._enabled = g || !1 };
epiviz.ui.controls.MarkerCodeControl.prototype = epiviz.utils.mapCopy(epiviz.ui.controls.CodeControl.prototype);
epiviz.ui.controls.MarkerCodeControl.constructor = epiviz.ui.controls.MarkerCodeControl;
epiviz.ui.controls.MarkerCodeControl.prototype.initialize = function() {
    if (!this._editor) {
        this._container.append(sprintf('<div id="%1$s"><label for="%1$s-true">On</label><input type="radio" id="%1$s-true" name="%1$s" %2$s /><label for="%1$s-false">Off</label><input type="radio" id="%1$s-false" name="%1$s" %3$s /></div>', this.id() + "-switch", this._enabled ? 'checked="checked"' : "", this._enabled ? "" : 'checked="checked"') + '<br /><div><label><b>Pre-mark Method</b></label></div><br /><div style="overflow-y: scroll; max-height: 250px;"><textarea autofocus="autofocus" class="pre-filter-code"></textarea></div><br/><div><label><b>Mark Method</b></label></div><br/><div style="overflow-y: scroll; max-height: 250px;"><textarea autofocus="autofocus" class="filter-code"></textarea></div>');
        var a = this._container.find("#" + this.id() + "-switch");
        a.buttonset();
        var b = this,
            c = function(a) { a = $("#" + b.id() + "-switch :radio:checked").attr("id");
                a = "true" == a.substr(a.lastIndexOf("-") + 1);
                b._editor && b._editor.setOption("disableInput", !a);
                b._markEditor && b._markEditor.setOption("disableInput", !a);
                b._enabled = a };
        a.find("#" + this.id() + "-switch-true").on("change", c);
        a.find("#" + this.id() + "-switch-false").on("change", c);
        a = this._container.find(".pre-filter-code");
        a.val(this._editorText);
        c = this._container.find(".filter-code");
        c.val(this._markText);
        this._editor = CodeMirror.fromTextArea(a[0], { lineNumbers: !0, matchBrackets: !0, continueComments: "Enter", extraKeys: { "Ctrl-Q": "toggleComment" }, autofocus: !0 });
        this._editor.setOption("disableInput", !this._enabled);
        this._markEditor = CodeMirror.fromTextArea(c[0], { lineNumbers: !0, matchBrackets: !0, continueComments: "Enter", extraKeys: { "Ctrl-Q": "toggleComment" }, autofocus: !0 });
        this._markEditor.setOption("disableInput", !this._enabled)
    }
};
epiviz.ui.controls.MarkerCodeControl.prototype.save = function() { this._editor && (this._editorText = this._editor.getValue(), this._markText = this._markEditor.getValue()) };
epiviz.ui.controls.MarkerCodeControl.prototype.revert = function() { this._editor && this._editor.setOption("value", this._editorText);
    this._markEditor && this._markEditor.setOption("value", this._markText) };
epiviz.ui.controls.MarkerCodeControl.prototype.result = function() { return { enabled: this._enabled, preMark: this._enabled ? this._editorText : null, mark: this._enabled ? this._markText : null } };
epiviz.ui.charts.decoration.MarkerCodeButton = function(a, b, c) { epiviz.ui.charts.decoration.CodeButton.call(this, a, b, c) };
epiviz.ui.charts.decoration.MarkerCodeButton.prototype = epiviz.utils.mapCopy(epiviz.ui.charts.decoration.CodeButton.prototype);
epiviz.ui.charts.decoration.MarkerCodeButton.constructor = epiviz.ui.charts.decoration.MarkerCodeButton;
epiviz.ui.charts.decoration.MarkerCodeButton.prototype._controlCreator = function() { var a = this; return function(b) { var c = a.visualization().getMarker(a.markerId()),
            d, e;
        c && (d = c.preMarkStr(), e = c.markStr());
        d = d || a.preMarkTemplate();
        e = e || a.markTemplate(); return new epiviz.ui.controls.MarkerCodeControl(b, a.markerLabel(), null, a.visualization(), d, e, void 0 != c) } };
epiviz.ui.charts.decoration.MarkerCodeButton.prototype._saveHandler = function() { var a = this; return function(b) { b.enabled ? a.visualization().putMarker(a.createMarker(b.preMark, b.mark)) : a.visualization().removeMarker(a.markerId()) } };
epiviz.ui.charts.decoration.MarkerCodeButton.prototype._cancelHandler = function() { return function() {} };
epiviz.ui.charts.decoration.MarkerCodeButton.prototype.createMarker = function(a, b) { return new epiviz.ui.charts.markers.VisualizationMarker(this.markerType(), this.markerId(), this.markerLabel(), a, b) };
epiviz.ui.charts.decoration.MarkerCodeButton.prototype.markerType = function() { throw Error("unimplemented abstract method"); };
epiviz.ui.charts.decoration.MarkerCodeButton.prototype.markerLabel = function() { throw Error("unimplemented abstract method"); };
epiviz.ui.charts.decoration.MarkerCodeButton.prototype.markerId = function() { throw Error("unimplemented abstract method"); };
epiviz.ui.charts.decoration.MarkerCodeButton.prototype.preMarkTemplate = function() { throw Error("unimplemented abstract method"); };
epiviz.ui.charts.decoration.MarkerCodeButton.prototype.markTemplate = function() { throw Error("unimplemented abstract method"); };
epiviz.ui.charts.decoration.ChartFilterCodeButton = function(a, b, c) { epiviz.ui.charts.decoration.MarkerCodeButton.call(this, a, b, c) };
epiviz.ui.charts.decoration.ChartFilterCodeButton.prototype = epiviz.utils.mapCopy(epiviz.ui.charts.decoration.MarkerCodeButton.prototype);
epiviz.ui.charts.decoration.ChartFilterCodeButton.constructor = epiviz.ui.charts.decoration.ChartFilterCodeButton;
epiviz.ui.charts.decoration.ChartFilterCodeButton.prototype.markerType = function() { return epiviz.ui.charts.markers.VisualizationMarker.Type.FILTER };
epiviz.ui.charts.decoration.ChartFilterCodeButton.prototype.markerLabel = function() { return "User Filter" };
epiviz.ui.charts.decoration.ChartFilterCodeButton.prototype.markerId = function() { return "user-filter" };
epiviz.ui.charts.decoration.ChartFilterCodeButton.prototype.preMarkTemplate = function() { return "/**\n * This method is called once before every , for all data available to the visualization,\n * for initialization. Its result can be used inside the filter method.\n * @param {epiviz.datatypes.GenomicData} [data]\n * @returns {InitialVars}\n * @template InitialVars\n */\nfunction(data) {\n  // TODO: Your code here\n  return null;\n}\n" };
epiviz.ui.charts.decoration.ChartFilterCodeButton.prototype.markTemplate = function() { return "/**\n * This method is called for every data object. If it returns false, the object will not be n.\n * @param {epiviz.datatypes.GenomicData.ValueItem} [item]\n * @param {epiviz.datatypes.GenomicData} [data]\n * @param {InitialVars} [preMarkResult]\n * @returns {boolean}\n * @template InitialVars\n */\nfunction(item, data, preMarkResult) {\n  // TODO: Your code here\n  return true;\n}\n" };
epiviz.ui.charts.tree.decoration = {};
epiviz.ui.charts.tree.decoration.TogglePropagateSelectionButton = function(a, b) { epiviz.ui.charts.decoration.VisualizationDecoration.call(this, a, b);
    this._checked = this.isChartOptionButton = !0 };
epiviz.ui.charts.tree.decoration.TogglePropagateSelectionButton.prototype = epiviz.utils.mapCopy(epiviz.ui.charts.decoration.VisualizationDecoration.prototype);
epiviz.ui.charts.tree.decoration.TogglePropagateSelectionButton.constructor = epiviz.ui.charts.tree.decoration.TogglePropagateSelectionButton;
epiviz.ui.charts.tree.decoration.TogglePropagateSelectionButton.prototype.decorate = function() {
    epiviz.ui.charts.decoration.VisualizationDecoration.prototype.decorate.call(this);
    for (var a = 0, b = this.otherDecoration(); b; b = b.otherDecoration()) b.isChartOptionButton && ++a;
    var c = this,
        b = sprintf("%s-propagate-selection-button", this.visualization().id());
    this.visualization().container().append(sprintf('<div id="%1$s-container" style="position: absolute; top: 5px; right: %2$spx"><input type="checkbox" id="%1$s" %3$s /><label for="%1$s" >Toggle propagate selection</label></div>',
        b, 5 + 30 * a, this._checked ? 'checked="checked"' : ""));
    var d = $("#" + b),
        e = $("#" + b + "-container");
    d.button({ text: !1, icons: { primary: "ui-icon ui-icon-refresh" } }).click(function() { c._checked = d.is(":checked");
        c.visualization().setAutoPropagateChanges(c._checked) });
    this.visualization().container().mousemove(function() { e.show() }).mouseleave(function() { e.hide() })
};
epiviz.ui.charts.tree.decoration.TogglePropagateSelectionButton.prototype.checked = function() { return this._checked };
epiviz.ui.charts.decoration.HierarchyFilterCodeButton = function(a, b, c) { epiviz.ui.charts.decoration.MarkerCodeButton.call(this, a, b, c) };
epiviz.ui.charts.decoration.HierarchyFilterCodeButton.prototype = epiviz.utils.mapCopy(epiviz.ui.charts.decoration.MarkerCodeButton.prototype);
epiviz.ui.charts.decoration.HierarchyFilterCodeButton.constructor = epiviz.ui.charts.decoration.HierarchyFilterCodeButton;
epiviz.ui.charts.decoration.HierarchyFilterCodeButton.prototype.markerType = function() { return epiviz.ui.charts.markers.VisualizationMarker.Type.FILTER };
epiviz.ui.charts.decoration.HierarchyFilterCodeButton.prototype.markerLabel = function() { return "User Filter" };
epiviz.ui.charts.decoration.HierarchyFilterCodeButton.prototype.markerId = function() { return "user-filter" };
epiviz.ui.charts.decoration.HierarchyFilterCodeButton.prototype.preMarkTemplate = function() { return "/**\n * This method is called once before every , for all data available to the visualization,\n * for initialization. Its result can be used inside the filter method.\n * @param {epiviz.ui.charts.tree.Node} [root]\n * @returns {InitialVars}\n * @template InitialVars\n */\nfunction(root) {\n  // TODO: Your code here\n  return null;\n}\n" };
epiviz.ui.charts.decoration.HierarchyFilterCodeButton.prototype.markTemplate = function() { return "/**\n * This method is called for every data object. If it returns false, the object will not be n.\n * @param {epiviz.ui.charts.tree.Node} [node]\n * @param {epiviz.ui.charts.tree.Node} [root]\n * @param {InitialVars} [preMarkResult]\n * @returns {boolean}\n * @template InitialVars\n */\nfunction(node, root, preMarkResult) {\n  // TODO: Your code here\n  return true;\n}\n" };
epiviz.ui.charts.decoration.ChartGroupByMeasurementsCodeButton = function(a, b, c) { epiviz.ui.charts.decoration.MarkerCodeButton.call(this, a, b, c) };
epiviz.ui.charts.decoration.ChartGroupByMeasurementsCodeButton.prototype = epiviz.utils.mapCopy(epiviz.ui.charts.decoration.MarkerCodeButton.prototype);
epiviz.ui.charts.decoration.ChartGroupByMeasurementsCodeButton.constructor = epiviz.ui.charts.decoration.ChartGroupByMeasurementsCodeButton;
epiviz.ui.charts.decoration.ChartGroupByMeasurementsCodeButton.prototype.markerType = function() { return epiviz.ui.charts.markers.VisualizationMarker.Type.GROUP_BY_MEASUREMENTS };
epiviz.ui.charts.decoration.ChartGroupByMeasurementsCodeButton.prototype.markerLabel = function() { return "Group by" };
epiviz.ui.charts.decoration.ChartGroupByMeasurementsCodeButton.prototype.markerId = function() { return "group-by-measurements" };
epiviz.ui.charts.decoration.ChartGroupByMeasurementsCodeButton.prototype.preMarkTemplate = function() { return "/**\n * This method is called once before every , for all data available to the visualization,\n * for initialization. Its result can be used inside the filter method.\n * @param {epiviz.datatypes.GenomicData} [data]\n * @returns {InitialVars}\n * @template InitialVars\n */\nfunction(data) {\n  // TODO: Your code here\n  return null;\n}\n" };
epiviz.ui.charts.decoration.ChartGroupByMeasurementsCodeButton.prototype.markTemplate = function() { return "/**\n * @param {epiviz.measurements.Measurement} m\n * @param {epiviz.datatypes.GenomicData} [data]\n * @param {InitialVars} [preMarkResult]\n * @returns {string}\n * @template InitialVars\n */\nfunction(m, data, preMarkResult) {\n  // TODO: Your code here\n  return 0;\n}\n" };
epiviz.ui.charts.decoration.ChartColorByMeasurementsCodeButton = function(a, b, c) { epiviz.ui.charts.decoration.MarkerCodeButton.call(this, a, b, c) };
epiviz.ui.charts.decoration.ChartColorByMeasurementsCodeButton.prototype = epiviz.utils.mapCopy(epiviz.ui.charts.decoration.MarkerCodeButton.prototype);
epiviz.ui.charts.decoration.ChartColorByMeasurementsCodeButton.constructor = epiviz.ui.charts.decoration.ChartColorByMeasurementsCodeButton;
epiviz.ui.charts.decoration.ChartColorByMeasurementsCodeButton.prototype.markerType = function() { return epiviz.ui.charts.markers.VisualizationMarker.Type.COLOR_BY_MEASUREMENTS };
epiviz.ui.charts.decoration.ChartColorByMeasurementsCodeButton.prototype.markerLabel = function() { return "Color by Measurements" };
epiviz.ui.charts.decoration.ChartColorByMeasurementsCodeButton.prototype.markerId = function() { return "color-by-measurements" };
epiviz.ui.charts.decoration.ChartColorByMeasurementsCodeButton.prototype.preMarkTemplate = function() { return "/**\n * This method is called once before every , for all data available to the visualization,\n * for initialization. Its result can be used inside the filter method.\n * @param {epiviz.datatypes.GenomicData} [data]\n * @returns {InitialVars}\n * @template InitialVars\n */\nfunction(data) {\n  // TODO: Your code here\n  return null;\n}\n" };
epiviz.ui.charts.decoration.ChartColorByMeasurementsCodeButton.prototype.markTemplate = function() { return "/**\n * @param {epiviz.measurements.Measurement} m\n * @param {epiviz.datatypes.GenomicData} [data]\n * @param {InitialVars} [preMarkResult]\n * @returns {string|number}\n * @template InitialVars\n */\nfunction(m, data, preMarkResult) {\n  // TODO: Your code here\n  return 0;\n}\n" };
epiviz.ui.charts.decoration.ChartOrderByMeasurementsCodeButton = function(a, b, c) { epiviz.ui.charts.decoration.MarkerCodeButton.call(this, a, b, c) };
epiviz.ui.charts.decoration.ChartOrderByMeasurementsCodeButton.prototype = epiviz.utils.mapCopy(epiviz.ui.charts.decoration.MarkerCodeButton.prototype);
epiviz.ui.charts.decoration.ChartOrderByMeasurementsCodeButton.constructor = epiviz.ui.charts.decoration.ChartOrderByMeasurementsCodeButton;
epiviz.ui.charts.decoration.ChartOrderByMeasurementsCodeButton.prototype.markerType = function() { return epiviz.ui.charts.markers.VisualizationMarker.Type.ORDER_BY_MEASUREMENTS };
epiviz.ui.charts.decoration.ChartOrderByMeasurementsCodeButton.prototype.markerLabel = function() { return "Order By" };
epiviz.ui.charts.decoration.ChartOrderByMeasurementsCodeButton.prototype.markerId = function() { return "order-by-measurements" };
epiviz.ui.charts.decoration.ChartOrderByMeasurementsCodeButton.prototype.preMarkTemplate = function() { return "/**\n * This method is called once before every , for all data available to the visualization,\n * for initialization. Its result can be used inside the filter method.\n * @param {epiviz.datatypes.GenomicData} [data]\n * @returns {InitialVars}\n * @template InitialVars\n */\nfunction(data) {\n  // TODO: Your code here\n  return null;\n}\n" };
epiviz.ui.charts.decoration.ChartOrderByMeasurementsCodeButton.prototype.markTemplate = function() { return "/**\n * @param {epiviz.measurements.Measurement} m\n * @param {epiviz.datatypes.GenomicData} [data]\n * @param {InitialVars} [preMarkResult]\n * @returns {string|number}\n * @template InitialVars\n */\nfunction(m, data, preMarkResult) {\n  // TODO: Your code here\n  return 0;\n}\n" };
epiviz.ui.charts.decoration.ChartColorByRowCodeButton = function(a, b, c) { epiviz.ui.charts.decoration.MarkerCodeButton.call(this, a, b, c) };
epiviz.ui.charts.decoration.ChartColorByRowCodeButton.prototype = epiviz.utils.mapCopy(epiviz.ui.charts.decoration.MarkerCodeButton.prototype);
epiviz.ui.charts.decoration.ChartColorByRowCodeButton.constructor = epiviz.ui.charts.decoration.ChartColorByRowCodeButton;
epiviz.ui.charts.decoration.ChartColorByRowCodeButton.prototype.markerType = function() { return epiviz.ui.charts.markers.VisualizationMarker.Type.COLOR_BY_ROW };
epiviz.ui.charts.decoration.ChartColorByRowCodeButton.prototype.markerLabel = function() { return "Color By" };
epiviz.ui.charts.decoration.ChartColorByRowCodeButton.prototype.markerId = function() { return "color-by" };
epiviz.ui.charts.decoration.ChartColorByRowCodeButton.prototype.preMarkTemplate = function() { return "/**\n * This method is called once before every , for all data available to the visualization,\n * for initialization. Its result can be used inside the filter method.\n * @param {epiviz.datatypes.GenomicData} [data]\n * @returns {InitialVars}\n * @template InitialVars\n */\nfunction(data) {\n  // TODO: Your code here\n  return null;\n}\n" };
epiviz.ui.charts.decoration.ChartColorByRowCodeButton.prototype.markTemplate = function() { return "/**\n * This method is called for every data object. If it returns false, the object will not be n.\n * @param {epiviz.datatypes.GenomicData.RowItem} [row]\n * @param {epiviz.datatypes.GenomicData} [data]\n * @param {InitialVars} [preMarkResult]\n * @returns {string}\n * @template InitialVars\n */\nfunction(row, data, preMarkResult) {\n  // TODO: Your code here\n  return row.metadata('colLabel');\n}\n" };
epiviz.ui.charts.ChartManager = function(a) {
    this._config = a;
    this._charts = {};
    this._chartsOrder = {};
    this._resizeInterval = null;
    this._chartAdded = new epiviz.events.Event;
    this._chartRemoved = new epiviz.events.Event;
    this._chartsOrderChanged = new epiviz.events.Event;
    this._chartsCleared = new epiviz.events.Event;
    this._chartColorsChanged = new epiviz.events.Event;
    this._chartMethodsModified = new epiviz.events.Event;
    this._chartMethodsReset = new epiviz.events.Event;
    this._chartMarkersModified = new epiviz.events.Event;
    this._chartCustomSettingsChanged =
        new epiviz.events.Event;
    this._chartSizeChanged = new epiviz.events.Event;
    this._chartMarginsChanged = new epiviz.events.Event;
    this._chartRequestHierarchy = new epiviz.events.Event;
    this._chartPropagateHierarchyChanges = new epiviz.events.Event;
    this._chartPropogateIcicleLocationChanges = new epiviz.events.Event;
    this._chartIcicleLocationChanges = new epiviz.events.Event;
    this._registerWindowResize()
};
epiviz.ui.charts.ChartManager.prototype.addChart = function(a, b, c, d) {
    c = c || sprintf("%s-%s-%s", a.chartDisplayType(), a.chartHtmlAttributeName(), epiviz.utils.generatePseudoGUID(5));
    var e = a.cssClass(),
        f = $("#" + a.chartContainer()),
        g = f.find(".accordion"),
        h = g.find(".vis-container");
    0 == g.length && (g = $('<div class="accordion"></div>').appendTo(f), f = a.chartDisplayType(), g.append(sprintf('<h3><a href="#"><b><span style="color: #025167">Views by %s</span></b></a></h3>', epiviz.ui.ControlManager.DISPLAY_TYPE_LABELS[f])),
        h = $('<div class="vis-container"></div>').appendTo(g), g.multiAccordion(), g.multiAccordion("option", "active", "all"));
    h.append(sprintf('<div id="%s" class="%s"></div>', c, e));
    g = h.find("#" + c);
    f = [];
    if (null != a._defaultSettings.chartMarkers || void 0 != a._defaultSettings.chartMarkers)
        for (e = 0; e < a._defaultSettings.chartMarkers.length; e++) h = a._defaultSettings.chartMarkers[e], f.push(new epiviz.ui.charts.markers.VisualizationMarker(h.type, h.id, h.name, h.preMark, h.mark));
    d = d || new epiviz.ui.charts.VisualizationProperties(a.defaultWidth(),
        a.defaultHeight(), a.defaultMargins(), b, a.defaultColors(), null, a.customSettingsValues(), a.customSettingsDefs(), f);
    b = a.createNew(c, g, d);
    this._charts[c] = b;
    this._registerChartHover(b);
    this._registerChartUnhover(b);
    this._registerChartSelect(b);
    this._registerChartDeselect(b);
    this._registerChartColorsChanged(b);
    this._registerChartMethodsModified(b);
    this._registerChartMethodsReset(b);
    this._registerChartMarkersModified(b);
    this._registerChartCustomSettingsChanged(b);
    this._registerChartSizeChanged(b);
    this._registerChartMarginsChanged(b);
    this._registerChartRemove(b);
    this._registerChartSave(b);
    this._registerChartRequestHierarchy(b);
    this._registerChartPropagateHierarchyChanges(b);
    this._registerChartPropogateIcicleLocationChanges(b);
    this._registerChartIcicleLocationChanges(b);
    if (a.decorations()) { g = void 0; for (e = 0; e < a.decorations().length; ++e)(f = epiviz.utils.evaluateFullyQualifiedTypeName(a.decorations()[e])) && (g = epiviz.utils.applyConstructor(f, [b, g, this._config]));
        g && g.decorate() }
    a.chartDisplayType() in this._chartsOrder || (this._chartsOrder[a.chartDisplayType()] = []);
    this._chartsOrder[a.chartDisplayType()].push(c);
    this._chartAdded.notify(new epiviz.ui.charts.VisEventArgs(c, { type: a, properties: d, chartsOrder: this._chartsOrder }));
    return c
};
epiviz.ui.charts.ChartManager.prototype.removeChart = function(a) { $("#" + a).remove(); var b = this._charts[a];
    delete this._charts[a];
    this._chartsOrder[b.displayType()].splice(this._chartsOrder[b.displayType()].indexOf(a), 1);
    b = $("#" + epiviz.ui.ControlManager.CHART_TYPE_CONTAINERS[b.displayType()]);
    0 == b.find(".accordion").find(".vis-container").children().length && b.empty();
    this._chartRemoved.notify(new epiviz.ui.charts.VisEventArgs(a, this._chartsOrder)) };
epiviz.ui.charts.ChartManager.prototype.chartsMeasurements = function() { var a = {},
        b; for (b in this._charts) this._charts.hasOwnProperty(b) && this._charts[b].displayType() != epiviz.ui.charts.VisualizationType.DisplayType.DATA_STRUCTURE && (a[b] = this._charts[b].measurements()); return a };
epiviz.ui.charts.ChartManager.prototype.updateCharts = function(a, b, c) { c = c || Object.keys(this._charts); for (var d = 0; d < c.length; ++d)
        if (this._charts.hasOwnProperty(c[d])) { var e = this._charts[c[d]];
            e && function(c) { c.transformData(a, b).done(function() { c.() }) }(e) } };
epiviz.ui.charts.ChartManager.prototype.updateDataStructureCharts = function() { for (var a = Object.keys(this._charts), b = 0; b < a.length; ++b)
        if (this._charts.hasOwnProperty(a[b])) { var c = this._charts[a[b]];
            c && c.displayType() == epiviz.ui.charts.VisualizationType.DisplayType.DATA_STRUCTURE && function(a) { setTimeout(function() { a.fireRequestHierarchy() }, 0) }(c) } };
epiviz.ui.charts.ChartManager.prototype.clear = function() { this._charts = {};
    this._chartsOrder = {}; var a = epiviz.ui.ControlManager.CHART_TYPE_CONTAINERS,
        b; for (b in a) a.hasOwnProperty(b) && $("#" + a[b]).empty();
    this._chartsCleared.notify() };
epiviz.ui.charts.ChartManager.prototype.dataWaitStart = function(a, b) { if (a && this._charts[a]) this._charts[a].onDataWaitStart().notify(new epiviz.ui.charts.VisEventArgs(a));
    else
        for (var c in this._charts) this._charts.hasOwnProperty(c) && b && b[this._charts[c]] && this._charts[c].onDataWaitStart().notify(new epiviz.ui.charts.VisEventArgs(c)) };
epiviz.ui.charts.ChartManager.prototype.onChartAdded = function() { return this._chartAdded };
epiviz.ui.charts.ChartManager.prototype.onChartRemoved = function() { return this._chartRemoved };
epiviz.ui.charts.ChartManager.prototype.onChartsOrderChanged = function() { return this._chartsOrderChanged };
epiviz.ui.charts.ChartManager.prototype.onChartsCleared = function() { return this._chartsCleared };
epiviz.ui.charts.ChartManager.prototype.onChartColorsChanged = function() { return this._chartColorsChanged };
epiviz.ui.charts.ChartManager.prototype.onChartMethodsModified = function() { return this._chartMethodsModified };
epiviz.ui.charts.ChartManager.prototype.onChartMethodsReset = function() { return this._chartMethodsReset };
epiviz.ui.charts.ChartManager.prototype.onChartMarkersModified = function() { return this._chartMarkersModified };
epiviz.ui.charts.ChartManager.prototype.onChartCustomSettingsChanged = function() { return this._chartCustomSettingsChanged };
epiviz.ui.charts.ChartManager.prototype.onChartSizeChanged = function() { return this._chartSizeChanged };
epiviz.ui.charts.ChartManager.prototype.onChartMarginsChanged = function() { return this._chartMarginsChanged };
epiviz.ui.charts.ChartManager.prototype.onChartRequestHierarchy = function() { return this._chartRequestHierarchy };
epiviz.ui.charts.ChartManager.prototype.onChartPropagateHierarchyChanges = function() { return this._chartPropagateHierarchyChanges };
epiviz.ui.charts.ChartManager.prototype.onChartPropogateIcicleLocationChanges = function() { return this._chartPropogateIcicleLocationChanges };
epiviz.ui.charts.ChartManager.prototype.onChartIcicleLocationChanges = function() { return this._chartIcicleLocationChanges };
epiviz.ui.charts.ChartManager.prototype._registerWindowResize = function() { var a = this;
    $(window).resize(function() { null !== a._resizeInterval && window.clearTimeout(a._resizeInterval);
        a._resizeInterval = window.setTimeout(function() { for (var b in a._charts) a._charts.hasOwnProperty(b) && a._charts[b].updateSize();
            a._resizeInterval = null }, 500) }) };
epiviz.ui.charts.ChartManager.prototype._registerChartHover = function(a) { var b = this;
    a.onHover().addListener(new epiviz.events.EventListener(function(a) { for (var c in b._charts) b._charts.hasOwnProperty(c) && b._charts[c].doHover(a.args) })) };
epiviz.ui.charts.ChartManager.prototype._registerChartUnhover = function(a) { var b = this;
    a.onUnhover().addListener(new epiviz.events.EventListener(function() { for (var a in b._charts) b._charts.hasOwnProperty(a) && b._charts[a].doUnhover() })) };
epiviz.ui.charts.ChartManager.prototype._registerChartSelect = function(a) { var b = this;
    a.onSelect().addListener(new epiviz.events.EventListener(function(a) { a = a.args; for (var c in b._charts) b._charts.hasOwnProperty(c) && b._charts[c].doSelect(a) })) };
epiviz.ui.charts.ChartManager.prototype._registerChartDeselect = function(a) { var b = this;
    a.onDeselect().addListener(new epiviz.events.EventListener(function() { for (var a in b._charts) b._charts.hasOwnProperty(a) && b._charts[a].doDeselect() })) };
epiviz.ui.charts.ChartManager.prototype._registerChartRemove = function(a) { var b = this;
    a.onRemove().addListener(new epiviz.events.EventListener(function(a) { b.removeChart(a.id) })) };
epiviz.ui.charts.ChartManager.prototype._registerChartSave = function(a) { var b = this; "default" != b._config.configType ? a.onSave().addListener(new epiviz.events.EventListener(function(a) {
        (new epiviz.ui.PrintManager(a.id, "epiviz_" + Math.floor($.now() / 1E3), "pdf")).print() })) : a.onSave().addListener(new epiviz.events.EventListener(function(a) {
        (new epiviz.ui.controls.SaveSvgAsImageDialog({ ok: function() {}, cancel: function() {} }, a.id, b._config.dataServerLocation + b._config.chartSaverLocation)).show() })) };
epiviz.ui.charts.ChartManager.prototype._registerChartColorsChanged = function(a) { var b = this;
    a.onColorsChanged().addListener(new epiviz.events.EventListener(function(a) { b._chartColorsChanged.notify(a) })) };
epiviz.ui.charts.ChartManager.prototype._registerChartMethodsModified = function(a) { var b = this;
    a.onMethodsModified().addListener(new epiviz.events.EventListener(function(a) { b._chartMethodsModified.notify(a) })) };
epiviz.ui.charts.ChartManager.prototype._registerChartMethodsReset = function(a) { var b = this;
    a.onMethodsReset().addListener(new epiviz.events.EventListener(function(a) { b._chartMethodsReset.notify(a) })) };
epiviz.ui.charts.ChartManager.prototype._registerChartMarkersModified = function(a) { var b = this;
    a.onMarkersModified().addListener(new epiviz.events.EventListener(function(a) { b._chartMarkersModified.notify(a) })) };
epiviz.ui.charts.ChartManager.prototype._registerChartCustomSettingsChanged = function(a) { var b = this;
    a.onCustomSettingsChanged().addListener(new epiviz.events.EventListener(function(a) { b._chartCustomSettingsChanged.notify(a) })) };
epiviz.ui.charts.ChartManager.prototype._registerChartSizeChanged = function(a) { var b = this;
    a.onSizeChanged().addListener(new epiviz.events.EventListener(function(a) { b._chartSizeChanged.notify(a) })) };
epiviz.ui.charts.ChartManager.prototype._registerChartMarginsChanged = function(a) { var b = this;
    a.onMarginsChanged().addListener(new epiviz.events.EventListener(function(a) { b._chartMarginsChanged.notify(a) })) };
epiviz.ui.charts.ChartManager.prototype._registerChartRequestHierarchy = function(a) { var b = this;
    a.displayType() == epiviz.ui.charts.VisualizationType.DisplayType.DATA_STRUCTURE && a.onRequestHierarchy().addListener(new epiviz.events.EventListener(function(a) { b._chartRequestHierarchy.notify(a) })) };
epiviz.ui.charts.ChartManager.prototype._registerChartPropagateHierarchyChanges = function(a) { var b = this;
    a.displayType() == epiviz.ui.charts.VisualizationType.DisplayType.DATA_STRUCTURE && a.onPropagateHierarchyChanges().addListener(new epiviz.events.EventListener(function(a) { b._chartPropagateHierarchyChanges.notify(a) })) };
epiviz.ui.charts.ChartManager.prototype._registerChartPropogateIcicleLocationChanges = function(a) { var b = this;
    a.displayType() == epiviz.ui.charts.VisualizationType.DisplayType.DATA_STRUCTURE && a.onPropagateIcicleLocationChanges().addListener(new epiviz.events.EventListener(function(a) { b._chartPropogateIcicleLocationChanges.notify(a) })) };
epiviz.ui.charts.ChartManager.prototype._registerChartIcicleLocationChanges = function(a) { this.onChartIcicleLocationChanges().addListener(new epiviz.events.EventListener(function(b) { a.displayType() == epiviz.ui.charts.VisualizationType.DisplayType.DATA_STRUCTURE && (a._updateLocation(b.args.start, b.args.width), a._Axes(a._lastRoot)) })) };
epiviz.ui.charts.ChartManager.prototype.getChartSettings = function(a) { a = this._charts[a]; var b = {};
    b.settings = a.customSettingsValues();
    b.colorMap = a.properties().colors; return b };
epiviz.ui.charts.ChartManager.prototype.setChartSettings = function(a, b, c) { a = this._charts[a]; if (null != b) { var d = a.customSettingsValues();
        Object.keys(b).forEach(function(a) { d[a] = b[a] });
        a.setCustomSettingsValues(d) }
    null != c && a.setColors(c);
    a.() };
epiviz.workspaces.WorkspaceManager = function(a, b, c, d, e) {
    this._config = a;
    this._locationManager = b;
    this._measurementsManager = c;
    this._chartManager = d;
    this._chartFactory = e;
    this._workspacesByName = this._workspaces = this._unchangedActiveWorkspace = this._activeWorkspace = null;
    this._workspacesLoaded = new epiviz.events.Event;
    this._activeWorkspaceChanged = new epiviz.events.Event;
    this._activeWorkspaceChanging = !1;
    this._requestWorkspaces = new epiviz.events.Event;
    this._activeWorkspaceContentChanged = new epiviz.events.Event;
    this._uiChartSettingsChanged = new epiviz.events.Event;
    var f = this;
    this._activeWorkspaceContentChangedListener = new epiviz.events.EventListener(function(a) { f._activeWorkspaceContentChanged.notify(a) });
    this._registerLocationChanged();
    this._registerComputedMeasurementAdded();
    this._registerComputedMeasurementRemoved();
    this._registerChartAdded();
    this._registerChartRemoved();
    this._registerChartsOrderChanged();
    this._registerChartColorsChanged();
    this._registerChartMethodsModified();
    this._registerChartMethodsReset();
    this._registerChartMarkersModified();
    this._registerChartSizeChanged();
    this._registerChartMarginsChanged();
    this._registerChartCustomSettingsChanged()
};
epiviz.workspaces.WorkspaceManager.prototype.onUiChartSettingsChanged = function() { return this._uiChartSettingsChanged };
epiviz.workspaces.WorkspaceManager.prototype.activeWorkspace = function() { return this._activeWorkspace || null };
epiviz.workspaces.WorkspaceManager.prototype.get = function(a) { return a && this._workspaces ? this._workspaces[a] || null : null };
epiviz.workspaces.WorkspaceManager.prototype.getByName = function(a) { return a && this._workspacesByName ? this._workspacesByName[a] || null : null };
epiviz.workspaces.WorkspaceManager.prototype.initialize = function() { this._requestWorkspaces.notify({ activeWorkspaceId: epiviz.ui.WebArgsManager.WEB_ARGS.ws || epiviz.ui.WebArgsManager.WEB_ARGS.workspace || null }) };
epiviz.workspaces.WorkspaceManager.prototype.updateWorkspaces = function(a, b, c, d) {
    if (a) { this._workspaces = {};
        this._workspacesByName = {}; for (var e = 0; e < a.length; ++e) null !== a[e].id() && (this._workspaces[a[e].id()] = a[e], this._workspacesByName[a[e].name()] = a[e]) }
    b || (b = a && a.length ? a[0] : epiviz.workspaces.Workspace.fromRawObject(this._config.defaultWorkspaceSettings, this._chartFactory, this._config));
    e = this._activeWorkspace;
    this._activeWorkspace = b;
    this._unchangedActiveWorkspace = d ? d : b ? b.copy(b.name(), b.id()) : null;
    e && e.onContentChanged().removeListener(this._activeWorkspaceContentChangedListener);
    this._activeWorkspace && this._activeWorkspace.onContentChanged().addListener(this._activeWorkspaceContentChangedListener);
    b = epiviz.ui.WebArgsManager.WEB_ARGS;
    d = void 0 != b.seqName ? b.seqName : this._activeWorkspace.range().seqName();
    var f = null,
        g = null;
    "undefined" != b.start && (f = parseInt(b.start) || this._activeWorkspace.range().start());
    "undefined" != b.end && (g = parseInt(b.end) || this._activeWorkspace.range().end());
    this._activeWorkspace.locationChanged(epiviz.datatypes.GenomicRange.fromStartEnd(d,
        f, g));
    this._workspacesLoaded.notify({ activeWorkspace: this._activeWorkspace, workspaces: a });
    this._activeWorkspaceChanged.notify({ oldValue: e, newValue: this._activeWorkspace, workspaceId: this._activeWorkspace.id() || c })
};
epiviz.workspaces.WorkspaceManager.prototype.updateWorkspace = function(a) { this._workspaces[a.id()] = a;
    this._workspacesByName[a.name()] = a };
epiviz.workspaces.WorkspaceManager.prototype.deleteActiveWorkspace = function() {
    var a = this._activeWorkspace;
    if (a && a.id()) {
        delete this._workspaces[a.id()];
        delete this._workspacesByName[a.name()];
        var b = null,
            c;
        for (c in this._workspaces)
            if (this._workspaces.hasOwnProperty(c)) { b = this._workspaces[c]; break }
        b || (b = epiviz.workspaces.Workspace.fromRawObject(this._config.defaultWorkspaceSettings, this._chartFactory, this._config));
        this._unchangedActiveWorkspace = (this._activeWorkspace = b) ? b.copy(b.name(), b.id()) : null;
        b = a.range().seqName();
        c = a.range().start();
        var d = a.range().end();
        this._activeWorkspace.locationChanged(epiviz.datatypes.GenomicRange.fromStartEnd(b, c, d));
        this._activeWorkspaceChanged.notify({ oldValue: a, newValue: this._activeWorkspace, workspaceId: this._activeWorkspace.id() })
    }
};
epiviz.workspaces.WorkspaceManager.prototype.revertActiveWorkspace = function() {
    if (this._unchangedActiveWorkspace) {
        var a = this._activeWorkspace,
            b = a.range().seqName(),
            c = a.range().start(),
            a = a.range().end();
        this._activeWorkspace = this._unchangedActiveWorkspace.copy(this._unchangedActiveWorkspace.name(), this._unchangedActiveWorkspace.id());
        this._activeWorkspace.locationChanged(epiviz.datatypes.GenomicRange.fromStartEnd(b, c, a));
        this._activeWorkspaceChanged.notify({
            oldValue: null,
            newValue: this._activeWorkspace,
            workspaceId: this._activeWorkspace.id()
        })
    }
};
epiviz.workspaces.WorkspaceManager.prototype.onWorkspacesLoaded = function() { return this._workspacesLoaded };
epiviz.workspaces.WorkspaceManager.prototype.onActiveWorkspaceChanged = function() { return this._activeWorkspaceChanged };
epiviz.workspaces.WorkspaceManager.prototype.startChangingActiveWorkspace = function() { this._activeWorkspaceChanging = !0 };
epiviz.workspaces.WorkspaceManager.prototype.endChangingActiveWorkspace = function() { this._activeWorkspaceChanging = !1 };
epiviz.workspaces.WorkspaceManager.prototype.activeWorkspaceChanging = function() { return this._activeWorkspaceChanging };
epiviz.workspaces.WorkspaceManager.prototype.onRequestWorkspaces = function() { return this._requestWorkspaces };
epiviz.workspaces.WorkspaceManager.prototype.onActiveWorkspaceContentChanged = function() { return this._activeWorkspaceContentChanged };
epiviz.workspaces.WorkspaceManager.prototype.changeActiveWorkspace = function(a, b) { if ((b = b || this._workspaces[a]) && b !== this._activeWorkspace) { var c = this._activeWorkspace;
        this._unchangedActiveWorkspace = (this._activeWorkspace = b) ? this._activeWorkspace.copy(this._activeWorkspace.name(), this._activeWorkspace.id()) : null;
        this._activeWorkspaceChanged.notify({ oldValue: c, newValue: this._activeWorkspace, workspaceId: a }) } };
epiviz.workspaces.WorkspaceManager.prototype._registerLocationChanged = function() { var a = this;
    this._locationManager.onCurrentLocationChanged().addListener(new epiviz.events.EventListener(function(b) { a._activeWorkspaceChanging || a._activeWorkspace && a._activeWorkspace.locationChanged(b.newValue) })) };
epiviz.workspaces.WorkspaceManager.prototype._registerChartAdded = function() { var a = this;
    this._chartManager.onChartAdded().addListener(new epiviz.events.EventListener(function(b) { a._activeWorkspaceChanging || a._activeWorkspace && a._activeWorkspace.chartAdded(b.id, b.args.type, b.args.properties, b.args.chartsOrder) })) };
epiviz.workspaces.WorkspaceManager.prototype._registerChartRemoved = function() { var a = this;
    this._chartManager.onChartRemoved().addListener(new epiviz.events.EventListener(function(b) { a._activeWorkspaceChanging || a._activeWorkspace && a._activeWorkspace.chartRemoved(b.id, b.args) })) };
epiviz.workspaces.WorkspaceManager.prototype._registerChartsOrderChanged = function() { var a = this;
    this._chartManager.onChartsOrderChanged().addListener(new epiviz.events.EventListener(function(b) { a._activeWorkspaceChanging || a._activeWorkspace && a._activeWorkspace.chartsOrderChanged(b) })) };
epiviz.workspaces.WorkspaceManager.prototype._registerChartColorsChanged = function() { var a = this;
    this._chartManager.onChartColorsChanged().addListener(new epiviz.events.EventListener(function(b) {!a._activeWorkspaceChanging && a._activeWorkspace && (a._activeWorkspace.chartColorsChanged(b.id, b.args), a.onUiChartSettingsChanged().notify({ chartId: b.id, colorMap: b.args })) })) };
epiviz.workspaces.WorkspaceManager.prototype._registerChartMethodsModified = function() { var a = this;
    this._chartManager.onChartMethodsModified().addListener(new epiviz.events.EventListener(function(b) { a._activeWorkspaceChanging || a._activeWorkspace && a._activeWorkspace.chartMethodsModified(b.id, b.args) })) };
epiviz.workspaces.WorkspaceManager.prototype._registerChartMethodsReset = function() { var a = this;
    this._chartManager.onChartMethodsReset().addListener(new epiviz.events.EventListener(function(b) { a._activeWorkspaceChanging || a._activeWorkspace && a._activeWorkspace.chartMethodsReset(b.id) })) };
epiviz.workspaces.WorkspaceManager.prototype._registerChartMarkersModified = function() { var a = this;
    this._chartManager.onChartMarkersModified().addListener(new epiviz.events.EventListener(function(b) { a._activeWorkspaceChanging || a._activeWorkspace && a._activeWorkspace.chartMarkersModified(b.id, b.args) })) };
epiviz.workspaces.WorkspaceManager.prototype._registerChartCustomSettingsChanged = function() { var a = this;
    this._chartManager.onChartCustomSettingsChanged().addListener(new epiviz.events.EventListener(function(b) {!a._activeWorkspaceChanging && a._activeWorkspace && (a._activeWorkspace.chartCustomSettingsChanged(b.id, b.args), a.onUiChartSettingsChanged().notify({ chartId: b.id, settings: b.args })) })) };
epiviz.workspaces.WorkspaceManager.prototype._registerChartSizeChanged = function() { var a = this;
    this._chartManager.onChartSizeChanged().addListener(new epiviz.events.EventListener(function(b) { a._activeWorkspaceChanging || a._activeWorkspace && a._activeWorkspace.chartSizeChanged(b.id, b.args.width, b.args.height) })) };
epiviz.workspaces.WorkspaceManager.prototype._registerChartMarginsChanged = function() { var a = this;
    this._chartManager.onChartMarginsChanged().addListener(new epiviz.events.EventListener(function(b) { a._activeWorkspaceChanging || a._activeWorkspace && a._activeWorkspace.chartMarginsChanged(b.id, b.args) })) };
epiviz.workspaces.WorkspaceManager.prototype._registerComputedMeasurementAdded = function() { var a = this;
    this._measurementsManager.onComputedMeasurementsAdded().addListener(new epiviz.events.EventListener(function(b) { a._activeWorkspaceChanging || a._activeWorkspace && a._activeWorkspace.computedMeasurementsAdded(b) })) };
epiviz.workspaces.WorkspaceManager.prototype._registerComputedMeasurementRemoved = function() { var a = this;
    this._measurementsManager.onComputedMeasurementsRemoved().addListener(new epiviz.events.EventListener(function(b) { a._activeWorkspaceChanging || a._activeWorkspace && a._activeWorkspace.computedMeasurementsRemoved(b) })) };
epiviz.workspaces.UserManager = function(a) { this._config = a };
epiviz.workspaces.UserManager.USER_STATUS = epiviz.workspaces.UserManager.USER_STATUS || { loggedIn: !1, userData: null, oauthProvider: null };
epiviz.workspaces.UserManager.prototype.toggleLogin = function() { epiviz.workspaces.UserManager.USER_STATUS.loggedIn ? this._logout() : this._login() };
epiviz.workspaces.UserManager.prototype._login = function() { var a = window.location.toString();
    0 < a.length && (a = encodeURIComponent(a));
    window.location = this._config.dataServerLocation + "login.php?location=" + a };
epiviz.workspaces.UserManager.prototype._logout = function() { var a = window.location.toString();
    0 < a.length && (a = encodeURIComponent(a));
    window.location = this._config.dataServerLocation + "logout.php?logout&location=" + a };
epiviz.main = function() {
    var a = new epiviz.Config(epiviz.Config.SETTINGS),
        b = new epiviz.ui.LocationManager(a),
        c = new epiviz.measurements.MeasurementsManager,
        d = new epiviz.ui.charts.ChartFactory(a),
        e = new epiviz.ui.charts.ChartManager(a),
        f = new epiviz.ui.ControlManager(a, d, e, c, b),
        g = new epiviz.data.DataProviderFactory(a),
        g = new epiviz.data.DataManager(a, g),
        h;
    "false" == a.useCookie ? (h = new epiviz.localstorage.LocalStorageManager(epiviz.localstorage.LocalStorageManager.MODE.INCOGNITO_MODE), h.clearWorkspace(), a.defaultWorkspaceSettings.content.charts =
        null) : h = new epiviz.localstorage.LocalStorageManager(epiviz.localstorage.LocalStorageManager.MODE.COOKIE_MODE);
    var m = new epiviz.workspaces.WorkspaceManager(a, b, c, e, d),
        l = new epiviz.workspaces.UserManager(a),
        n = new epiviz.ui.WebArgsManager(b, m),
        b = new epiviz.EpiViz(a, b, c, f, g, d, e, m, l, n, h);
    epiviz.ui.charts.transform.clustering.ClusteringAlgorithmFactory.initialize(a);
    b.start()
};