export default function (asyncFunc) {
  return async function(done) {
    try {
      await asyncFunc(done);
      done();
    } catch (ex) {
      done(ex);
    }
  };
}
