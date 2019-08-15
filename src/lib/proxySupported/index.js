const proxySupported = typeof Function('return this')().Proxy === 'function';

export default proxySupported;
