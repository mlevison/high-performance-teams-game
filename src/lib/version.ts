/* https://stackoverflow.com/a/8831937 */
function hashCode(string: string) {
  var hash = 0;
  if (string.length === 0) {
    return hash.toString(36).replace(/^-/, '');
  }
  for (var i = 0; i < string.length; i++) {
    var char = string.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return hash.toString(36).replace(/^-/, '');
}

export default new Promise<string>(async (resolve, reject) => {
  if (process.env.TEAM_GAME_VERSION) {
    resolve(process.env.TEAM_GAME_VERSION);
    return;
  }

  if (process.env.NODE_ENV === 'test') {
    resolve('test');
    return;
  }
  try {
    const response = await fetch('/asset-manifest.json');
    resolve(hashCode(await response.text()));
  } catch (err) {
    reject(err);
  }
});
