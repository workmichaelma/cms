import { Parser } from '@json2csv/plainjs';
export const parseJSONToCSV = (data) => {
  try {
    if (data) {
      const parser = new Parser({});
      const file = parser.parse(data);

      const bom = Buffer.from([0xef, 0xbb, 0xbf]);
      const fileBuffer = Buffer.concat([bom, Buffer.from(file, 'utf8')]);
      return fileBuffer;
    }
    return [];
  } catch (err) {
    console.error(`Failed to parse CSV file: ${err}`);
    return [];
  }
};
