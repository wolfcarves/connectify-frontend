interface LocationInfo {
  as: string;
  city: string;
  country: string;
  countryCode: string;
  isp: string;
  lat: number;
  lon: number;
  org: string;
  query: string;
  region: string;
  regionName: string;
  status: string;
  timezone: string;
  zip: string;
}

const getUserLocation = async () => {
  const fetchIpAddress = await fetch('https://api.ipify.org?format=json');
  const fetchIpAddressResponse = (await fetchIpAddress.json()) as {
    ip: string;
  };

  const ip = fetchIpAddressResponse.ip;

  const apiKey = '703cabff82beaa78e818464a2009a895';

  const fetchLocation = await fetch(`http://ip-api.com/json/${ip}`);
  const fetchLocationResponse = (await fetchLocation.json()) as LocationInfo;

  return fetchLocationResponse;
};

export default getUserLocation;
