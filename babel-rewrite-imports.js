export default function replaceImport(originalPath) {
  if (originalPath.startsWith('workflow')) {
    return originalPath.replace('workflow', `${__dirname}`);
  }
  return originalPath;
}
