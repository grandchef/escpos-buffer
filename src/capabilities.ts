const capabilities = {
  models: [
    // Bematech
    {
      model: 'MP-4200 TH',
      profile: 'bematech',
    },
    {
      model: 'MP-2800 TH',
      profile: 'bematech',
      columns: 48,
      feed: 4,
      fonts: [
        {
          name: 'Font A',
          columns: 48,
        },
        {
          name: 'Font B',
          columns: 64,
        },
      ],
    },
    {
      model: 'MP-2500 TH',
      profile: 'bematech',
      feed: 6,
    },
    {
      model: 'MP-2100 TH',
      profile: 'bematech',
      feed: 6,
    },
    {
      model: 'MP-4000 TH',
      profile: 'bematech',
    },
    {
      model: 'MP-5100 TH',
      profile: 'bematech',
    },
    {
      model: 'MP-100S TH',
      profile: 'bematech',
    },
    {
      model: 'MP-20 MI',
      profile: 'bematech',
    },

    // Epson
    {
      model: 'TM-T20',
      profile: 'epson',
      columns: 48,
      fonts: [
        {
          name: 'Font 1',
          columns: 42,
        },
        {
          name: 'Font A',
          columns: 48,
        },
        {
          name: 'Font 2',
          columns: 60,
        },
        {
          name: 'Font B',
          columns: 64,
        },
      ],
    },
    {
      model: 'TM-T81',
      profile: 'epson',
    },
    {
      model: 'TM-T88',
      profile: 'epson',
    },

    // Elgin
    {
      model: 'I9',
      profile: 'elgin',
      columns: 48,
      feed: 4,
      fonts: [
        {
          name: 'Font A',
          columns: 48,
        },
        {
          name: 'Font B',
          columns: 64,
        },
      ],
    },
    {
      model: 'I7',
      profile: 'elgin',
    },
    {
      model: 'VOX',
      profile: 'elgin',
    },
    {
      model: 'VOX+',
      profile: 'elgin',
    },
    {
      model: 'NIX',
      profile: 'elgin',
    },

    // Daruma
    {
      model: 'DR800',
      profile: 'daruma',
      feed: 2,
    },
    {
      model: 'DR700',
      profile: 'daruma',
    },
    {
      model: 'DR600',
      profile: 'daruma',
    },
    {
      model: 'DS348',
      profile: 'daruma',
    },
    {
      model: 'DS300',
      profile: 'daruma',
    },

    // Diebold
    {
      model: 'TSP-143',
      profile: 'diebold',
    },
    {
      model: 'IM453',
      profile: 'diebold',
    },
    {
      model: 'IM433',
      profile: 'diebold',
    },
    {
      model: 'IM402',
      profile: 'diebold',
    },
    {
      model: 'IM113',
      profile: 'diebold',
    },
    {
      model: 'IM833',
      profile: 'diebold',
      name: 'Mecaf Perfecta',
    },

    // Sweda
    {
      model: 'SI-300L',
      profile: 'sweda',
    },
    {
      model: 'SI-300S',
      profile: 'sweda',
    },
    {
      model: 'SI-300W',
      profile: 'sweda',
    },
    {
      model: 'SI-250',
      profile: 'sweda',
    },

    // Dataregis
    {
      model: 'E-3202',
      profile: 'dataregis',
    },
    {
      model: 'DT200',
      profile: 'dataregis',
    },

    // ControliD
    {
      model: 'PrintiD',
      profile: 'controlid',
      name: 'Print iD',
    },
    {
      model: 'PrintiD-Touch',
      profile: 'controlid',
      name: 'Print iD Touch',
    },

    // Perto
    {
      model: 'PertoPrinter',
      profile: 'perto',
      name: 'Perto Printer',
    },

    // Citizen
    {
      model: 'CMP-20',
      profile: 'generic',
      brand: 'Citizen',
    },

    // Generic
    {
      model: 'POS-80',
      profile: 'generic',
      columns: 48,
      fonts: [
        {
          name: 'Font A',
          columns: 48,
        },
        {
          name: 'Font B',
          columns: 56,
        },
      ],
    },
    {
      model: 'POS-58',
      profile: 'generic',
    },
  ],
  profiles: {
    epson: {
      brand: 'Epson',
      columns: 42,
      feed: 3,
      codepage: 'cp850',
      fonts: [
        {
          name: 'Font A',
          columns: 42,
        },
        {
          name: 'Font B',
          columns: 56,
        },
      ],
      codepages: {
        cp437: '\x1Bt\x00',
        cp930: '\x1Bt\x01',
        cp850: '\x1Bt\x02',
        cp860: '\x1Bt\x03',
        cp863: '\x1Bt\x04',
        cp865: '\x1Bt\x05',
        cp1252: '\x1Bt\x10',
        cp866: '\x1Bt\x11',
        cp852: '\x1Bt\x12',
        cp858: '\x1Bt\x13',
      },
    },
    bematech: {
      brand: 'Bematech',
      columns: 50,
      feed: 0,
      codepage: 'cp850',
      fonts: [
        {
          name: 'Font A',
          columns: 42,
        },
        {
          name: 'Font C',
          columns: 50,
        },
        {
          name: 'Font B',
          columns: 56,
        },
      ],
      initialize: '\x1D\xf950',
      codepages: {
        cp850: '\x1Bt\x02',
        cp437: '\x1Bt\x03',
        cp860: '\x1Bt\x04',
        cp858: '\x1Bt\x05',
        cp866: '\x1Bt\x06',
        cp864: '\x1Bt\x07',
        utf8: '\x1Bt\x08',
        big5e: '\x1Bt\x09',
        jis: '\x1Bt\x0a',
        shiftjis: '\x1Bt\x0b',
        gb2312: '\x1Bt\x0c',
      },
    },
    elgin: {
      profile: 'epson',
      brand: 'Elgin',
      feed: 2,
      codepages: {
        cp1252: '\x1Bt\x01',
        cp850: '\x1Bt\x02',
        cp437: '\x1Bt\x03',
        cp860: '\x1Bt\x04',
        cp858: '\x1Bt\x05',
      },
    },
    sweda: {
      profile: 'elgin',
      feed: 8,
      brand: 'Sweda',
    },
    dataregis: {
      profile: 'elgin',
      brand: 'Dataregis',
    },
    daruma: {
      brand: 'Daruma',
      profile: 'epson',
      columns: 48,
      feed: 8,
      codepage: 'cp1252',
      fonts: [
        {
          name: 'Font A',
          columns: 48,
        },
        {
          name: 'Font B',
          columns: 52,
        },
      ],
      codepages: {
        iso88591: '\x1Bt\x01',
        cp850: '\x1Bt\x02',
        cp1252: '\x1Bt\x03',
        cp437: '\x1Bt\x04',
      },
    },
    diebold: {
      brand: 'Diebold',
      profile: 'daruma',
      codepages: {
        cp1252: '\x1Bt\x01',
        cp850: '\x1Bt\x02',
        cp437: '\x1Bt\x03',
      },
    },
    controlid: {
      profile: 'epson',
      brand: 'ControliD',
      columns: 48,
      feed: 0,
      fonts: [
        {
          name: 'Font C',
          columns: 48,
        },
        {
          name: 'Font A',
          columns: 48,
        },
        {
          name: 'Font B',
          columns: 64,
        },
      ],
    },
    perto: {
      profile: 'elgin',
      brand: 'Perto',
      columns: 48,
      codepage: 'cp850',
      fonts: [
        {
          name: 'Font A',
          columns: 48,
        },
        {
          name: 'Font B',
          columns: 57,
        },
      ],
    },
    generic: {
      brand: 'Generic',
      codepage: 'cp850',
      columns: 32,
      fonts: [
        {
          name: 'Font A',
          columns: 32,
        },
        {
          name: 'Font B',
          columns: 42,
        },
      ],
      initialize: '\x1BR\x0C',
      codepages: {
        cp437: '\x1Bt\x00',
        cp930: '\x1Bt\x01',
        cp850: '\x1Bt\x02',
        cp860: '\x1Bt\x03',
        cp863: '\x1Bt\x04',
        cp865: '\x1Bt\x05',
        cp1252: '\x1Bt\x06',
        cp866: '\x1Bt\x07',
        cp852: '\x1Bt\x08',
        cp858: '\x1Bt\x09',
        cp1253: '\x1Bt\x0A',
        cp737: '\x1Bt\x0B',
        cp857: '\x1Bt\x0C',
        iso88599: '\x1Bt\x0D',
        cp864: '\x1Bt\x0E',
        cp862: '\x1Bt\x0F',
        iso88592: '\x1Bt\x10',
      },
    },
  },
} as const;

export type Font = {
  /**
   * Font name, ex: Font A, Font B
   */
  name: string;

  /**
   * Max columns to use in this font
   */
  columns: number;
};

export type CodePage = {
  /**
   * Code page, ex: cp850, utf8
   */
  code: string;

  /**
   * Command to use this code page
   */
  command: string;
};

type Models = typeof capabilities['models'];
export type Profile = Models[number]['profile'];
export type SupportedModel = Models[number]['model'];

export type Capability = {
  /**
   * Profile to process printer commands
   */
  profile: string;

  /**
   * Printer brand
   */
  brand: string;

  /**
   * Printer model reference
   */
  model: string;

  /**
   * Printer model name
   */
  name?: string;

  /**
   * Default columns number
   */
  columns: number;

  /**
   * Default feed rows to cut properly
   */
  feed?: number;

  /**
   * Available fonts
   */
  fonts: Font[];

  /**
   * Default code page
   */
  codepage: string;

  /**
   * Initialize printer with this command
   */
  initialize?: string;

  /**
   * Available code pages
   */
  codepages: CodePage[];
};

export default capabilities;
