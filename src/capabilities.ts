export type Font = {
  name: string,
  columns: number
}

export type CodePage = {
  code: string,
  command: string
}

export type Capability = {
  profile: string,
  brand: string,
  model: string,
  name?: string,
  columns: number,
  fonts: Font[],
  codepage: string,
  initialize?: string,
  codepages: CodePage[]
}

export default {
  'models': {
    'MP-5100 TH': 'bematech',
    'MP-4200 TH': 'bematech',
    'MP-20 MI': 'bematech',
    'MP-100S TH': 'bematech',
    'TM-T20': 'tmt20',
    'TM-T81': 'epson',
    'TM-T88': 'epson',
    'NIX': 'elgin',
    'VOX+': 'elgin',
    'VOX': 'elgin',
    'I9': 'elgin',
    'I7': 'elgin',
    'DS300': 'daruma',
    'DS348': 'daruma',
    'DR600': 'daruma',
    'DR700': 'daruma',
    'DR800': 'daruma',
    'IM113': 'diebold',
    'IM402': 'diebold',
    'IM433': 'diebold',
    'IM453': 'diebold',
    'TSP-143': 'diebold',
    'SI-250': 'sweda',
    'SI-300L': 'sweda',
    'SI-300S': 'sweda',
    'SI-300W': 'sweda',
    'E-3202': 'dataregis',
    'DT200': 'dataregis',
    'IM833': {
      'profile': 'diebold',
      'name': 'Mecaf Perfecta'
    },
    'PrintiD': 'controlid',
    'PertoPrinter': 'perto',
    'CMP-20': {
      'profile': 'generic',
      'brand': 'Citizen'
    }
  },
  'profiles': {
    'epson': {
      'brand': 'Epson',
      'columns': 42,
      'codepage': 'cp850',
      'fonts': [
        {
          'name': 'Font A',
          'columns': 42
        },
        {
          'name': 'Font B',
          'columns': 56
        }
      ],
      'codepages': {
        'cp437': '\x1Bt\x00',
        'cp930': '\x1Bt\x01',
        'cp850': '\x1Bt\x02',
        'cp860': '\x1Bt\x03',
        'cp863': '\x1Bt\x04',
        'cp865': '\x1Bt\x05',
        'cp1252': '\x1Bt\x10',
        'cp866': '\x1Bt\x11',
        'cp852': '\x1Bt\x12',
        'cp858': '\x1Bt\x13'
      }
    },
    'tmt20': {
      'profile': 'epson',
      'columns': 48,
      'fonts': [
        {
          'name': 'Font 1',
          'columns': 42,
        },
        {
          'name': 'Font A',
          'columns': 48,
        },
        {
          'name': 'Font 2',
          'columns': 60,
        },
        {
          'name': 'Font B',
          'columns': 64,
        },
      ],
    },
    'bematech': {
      'brand': 'Bematech',
      'columns': 50,
      'codepage': 'cp850',
      'fonts': [
        {
          'name': 'Font A',
          'columns': 42
        },
        {
          'name': 'Font C',
          'columns': 50
        },
        {
          'name': 'Font B',
          'columns': 56
        }
      ],
      'initialize': '\x1D\xf950',
      'codepages': {
        'cp850': '\x1Bt\x02',
        'cp437': '\x1Bt\x03',
        'cp860': '\x1Bt\x04',
        'cp858': '\x1Bt\x05',
        'cp866': '\x1Bt\x06',
        'cp864': '\x1Bt\x07',
        'utf8': '\x1Bt\x08',
        'big5e': '\x1Bt\x09',
        'jis': '\x1Bt\x0a',
        'shiftjis': '\x1Bt\x0b',
        'gb2312': '\x1Bt\x0c'
      }
    },
    'elgin': {
      'profile': 'epson',
      'brand': 'Elgin',
      'codepages': {
        'cp1252': '\x1Bt\x01',
        'cp850': '\x1Bt\x02',
        'cp437': '\x1Bt\x03',
        'cp860': '\x1Bt\x04',
        'cp858': '\x1Bt\x05'
      }
    },
    'sweda': {
      'profile': 'elgin',
      'brand': 'Sweda'
    },
    'dataregis': {
      'profile': 'elgin',
      'brand': 'Dataregis'
    },
    'daruma': {
      'brand': 'Daruma',
      'profile': 'epson',
      'columns': 48,
      'codepage': 'cp850',
      'fonts': [
        {
          'name': 'Font A',
          'columns': 48
        },
        {
          'name': 'Font B',
          'columns': 52
        },
      ],
      'codepages': {
        'iso88591': '\x1Bt\x01',
        'cp850': '\x1Bt\x02',
        'cp1252': '\x1Bt\x03',
        'cp437': '\x1Bt\x04'
      }
    },
    'diebold': {
      'brand': 'Diebold',
      'profile': 'daruma',
      'codepages': {
        'cp1252': '\x1Bt\x01',
        'cp850': '\x1Bt\x02',
        'cp437': '\x1Bt\x03',
      }
    },
    'controlid': {
      'profile': 'epson',
      'brand': 'ControliD'
    },
    'perto': {
      'profile': 'elgin',
      'brand': 'Perto',
      'columns': 48,
      'codepage': 'cp850',
      'fonts': [
        {
          'name': 'Font A',
          'columns': 48
        },
        {
          'name': 'Font B',
          'columns': 57
        }
      ]
    },
    'generic': {
      'brand': 'Generic',
      'columns': 32,
      'codepage': 'cp850',
      'fonts': [
        {
          'name': 'Font A',
          'columns': 32
        },
        {
          'name': 'Font B',
          'columns': 42
        }
      ],
      'initialize': '\x1BR\x0C',
      'codepages': {
        'cp437': '\x1Bt\x00',
        'cp930': '\x1Bt\x01',
        'cp850': '\x1Bt\x02',
        'cp860': '\x1Bt\x03',
        'cp863': '\x1Bt\x04',
        'cp865': '\x1Bt\x05',
        'cp1252': '\x1Bt\x06',
        'cp866': '\x1Bt\x07',
        'cp852': '\x1Bt\x08',
        'cp858': '\x1Bt\x09',
        'cp1253': '\x1Bt\x0A',
        'cp737': '\x1Bt\x0B',
        'cp857': '\x1Bt\x0C',
        'iso88599': '\x1Bt\x0D',
        'cp864': '\x1Bt\x0E',
        'cp862': '\x1Bt\x0F',
        'iso88592': '\x1Bt\x10'
      }
    }
  }
}
