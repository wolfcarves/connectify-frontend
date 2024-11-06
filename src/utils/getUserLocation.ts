interface LocationInfo {
  city: string;
  connection_type: string;
  continent_code: string;
  continent_name: string;
  country_code: string;
  country_name: string;
  dma: string | null;
  ip: string;
  ip_routing_type: string;
  latitude: number;
  longitude: number;
  location: {
    geoname_id: number;
    capital: string;
    languages: Array<{ code: string; name: string; native: string }>;
    country_flag: string;
    country_flag_emoji: string;
    country_flag_emoji_unicode: string;
    calling_code: string;
    is_eu: boolean;
  };
  msa: string | null;
  radius: string;
  region_code: string;
  region_name: string;
  type: string;
  zip: string;
}

const getUserLocation = async () => {
  const fetchIpAddress = await fetch('https://api.ipify.org?format=json');
  const fetchIpAddressResponse = (await fetchIpAddress.json()) as {
    ip: string;
  };

  const ip = fetchIpAddressResponse.ip;

  const apiKey = '703cabff82beaa78e818464a2009a895';

  const fetchLocation = await fetch(
    `http://api.ipapi.com/api/${ip}?access_key=${apiKey}`,
  );
  const fetchLocationResponse = (await fetchLocation.json()) as LocationInfo;

  return fetchLocationResponse;
};

export default getUserLocation;
