export declare type Font = {
    name: string;
    columns: number;
};
export declare type CodePage = {
    code: string;
    command: string;
};
export declare type Capability = {
    profile: string;
    brand: string;
    model: string;
    name?: string;
    columns: number;
    fonts: Font[];
    codepage: string;
    initialize?: string;
    codepages: CodePage[];
};
declare const _default: {
    'models': {
        'MP-5100 TH': string;
        'MP-4200 TH': string;
        'MP-20 MI': string;
        'MP-100S TH': string;
        'TM-T20': string;
        'TM-T81': string;
        'TM-T88': string;
        'NIX': string;
        'VOX+': string;
        'VOX': string;
        'I9': string;
        'I7': string;
        'DS300': string;
        'DS348': string;
        'DR600': string;
        'DR700': string;
        'DR800': string;
        'IM113': string;
        'IM402': string;
        'IM433': string;
        'IM453': string;
        'TSP-143': string;
        'SI-250': string;
        'SI-300L': string;
        'SI-300S': string;
        'SI-300W': string;
        'E-3202': string;
        'DT200': string;
        'IM833': {
            'profile': string;
            'name': string;
        };
        'PrintiD': string;
        'PertoPrinter': string;
        'CMP-20': {
            'profile': string;
            'brand': string;
        };
    };
    'profiles': {
        'epson': {
            'brand': string;
            'columns': number;
            'codepage': string;
            'fonts': {
                'name': string;
                'columns': number;
            }[];
            'codepages': {
                'cp437': string;
                'cp930': string;
                'cp850': string;
                'cp860': string;
                'cp863': string;
                'cp865': string;
                'cp1252': string;
                'cp866': string;
                'cp852': string;
                'cp858': string;
            };
        };
        'tmt20': {
            'profile': string;
            'columns': number;
            'fonts': {
                'name': string;
                'columns': number;
            }[];
        };
        'bematech': {
            'brand': string;
            'columns': number;
            'codepage': string;
            'fonts': {
                'name': string;
                'columns': number;
            }[];
            'initialize': string;
            'codepages': {
                'cp850': string;
                'cp437': string;
                'cp860': string;
                'cp858': string;
                'cp866': string;
                'cp864': string;
                'utf8': string;
                'big5e': string;
                'jis': string;
                'shiftjis': string;
                'gb2312': string;
            };
        };
        'elgin': {
            'profile': string;
            'brand': string;
            'codepages': {
                'cp1252': string;
                'cp850': string;
                'cp437': string;
                'cp860': string;
                'cp858': string;
            };
        };
        'sweda': {
            'profile': string;
            'brand': string;
        };
        'dataregis': {
            'profile': string;
            'brand': string;
        };
        'daruma': {
            'brand': string;
            'profile': string;
            'columns': number;
            'codepage': string;
            'fonts': {
                'name': string;
                'columns': number;
            }[];
            'codepages': {
                'iso88591': string;
                'cp850': string;
                'cp1252': string;
                'cp437': string;
            };
        };
        'diebold': {
            'brand': string;
            'profile': string;
            'codepages': {
                'cp1252': string;
                'cp850': string;
                'cp437': string;
            };
        };
        'controlid': {
            'profile': string;
            'brand': string;
        };
        'perto': {
            'profile': string;
            'brand': string;
            'columns': number;
            'codepage': string;
            'fonts': {
                'name': string;
                'columns': number;
            }[];
        };
        'generic': {
            'brand': string;
            'columns': number;
            'codepage': string;
            'fonts': {
                'name': string;
                'columns': number;
            }[];
            'initialize': string;
            'codepages': {
                'cp437': string;
                'cp930': string;
                'cp850': string;
                'cp860': string;
                'cp863': string;
                'cp865': string;
                'cp1252': string;
                'cp866': string;
                'cp852': string;
                'cp858': string;
                'cp1253': string;
                'cp737': string;
                'cp857': string;
                'iso88599': string;
                'cp864': string;
                'cp862': string;
                'iso88592': string;
            };
        };
    };
};
export default _default;
