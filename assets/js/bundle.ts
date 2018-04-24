declare var require: any;
function requireAll(r: any) { r.keys().forEach(r); }
requireAll(require.context("../images/", true, /\.png$/));