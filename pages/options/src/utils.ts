export function isValidStrictHttpRootDomain(url: string) {
  try {
    const parsedUrl = new URL(url);
    // 检查协议是否是 HTTP/HTTPS
    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
      return false;
    }
    // 验证根域名
    const rootDomainRegex = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}$/i;
    return rootDomainRegex.test(parsedUrl.hostname);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return false;
  }
}
