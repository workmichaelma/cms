import { find } from 'lodash';
import { useEffect, useMemo, useState } from 'react';

const regionOptions = [
  {
    _id: 'hk',
    label: '香港島'
  },
  {
    _id: 'kowloon',
    label: '九龍'
  },
  {
    _id: 'nt',
    label: '新界'
  }
];
const hk = [
  {
    _id: 'wc',
    label: '灣仔區',
    region: 'hk'
  },
  {
    _id: 'cw',
    label: '中西區',
    region: 'hk'
  },
  {
    _id: 'ea',
    label: '東區',
    region: 'hk'
  },
  {
    _id: 'so',
    label: '南區',
    region: 'hk'
  }
];
const kowloon = [
  {
    _id: 'kc',
    label: '九龍城區',
    region: 'kowloon'
  },
  {
    _id: 'wts',
    label: '黃大仙區',
    region: 'kowloon'
  },
  {
    _id: 'ssp',
    label: '深水埗區',
    region: 'kowloon'
  },
  {
    _id: 'ytm',
    label: '油尖旺區',
    region: 'kowloon'
  },
  {
    _id: 'kt',
    label: '觀塘區',
    region: 'kowloon'
  }
];
const nt = [
  {
    _id: 'tw',
    label: '荃灣區',
    region: 'nt'
  },
  {
    _id: 'ki',
    label: '葵青區',
    region: 'nt'
  },
  {
    _id: 'sk',
    label: '西貢區',
    region: 'nt'
  },
  {
    _id: 'st',
    label: '沙田區',
    region: 'nt'
  },
  {
    _id: 'tp',
    label: '大埔區',
    region: 'nt'
  },
  {
    _id: 'yl',
    label: '元朗區',
    region: 'nt'
  },
  {
    _id: 'tm',
    label: '屯門區',
    region: 'nt'
  },
  {
    _id: 'no',
    label: '北區',
    region: 'nt'
  },
  {
    _id: 'is',
    label: '離島區',
    region: 'nt'
  }
];
const districtOptions = {
  hk,
  kowloon,
  nt
};

export const useWorkPlace = ({ schema, value, field, setInputs }) => {
  const [region, setRegion] = useState('');
  const [district, setDistruct] = useState('');
  const [place, setPlace] = useState({ region: { value: region }, district: { value: district } });

  const title = useMemo(() => {
    const a = find(schema, { field });
    return a?.title || '地區';
  }, [schema, field]);

  useEffect(() => {
    const [_region = '', _district = ''] = (value || '').split(',');
    if (_region) {
      setRegion(_region);
    }
    if (_district) {
      setDistruct(_district);
    }
  }, [value]);

  useEffect(() => {
    setInputs((v) => ({
      ...v,
      [field]: {
        value: `${place?.region?.value || ''},${place?.district?.value || ''}`
      }
    }));
  }, [place, field]);

  useEffect(() => {
    const r = place?.region?.value;
    const d = place?.district?.value;

    if (d) {
      const a = find(districtOptions[r], { _id: d });
      if (!a) {
        setDistruct('');
      }
    }
  }, [field, place]);

  return {
    title,
    regionOptions,
    districtOptions,
    region,
    district,
    place,
    setPlace
  };
};
