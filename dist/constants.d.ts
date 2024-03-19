export const POSTGRESQL: "POSTGRESQL";
export const MYSQL: "MYSQL";
export namespace SUPPORTED_DRIVERS {
  let POSTGRESQL: boolean;
  let MYSQL: boolean;
}
export const START_TRANSACTION: "BEGIN;";
export const COMMIT: "COMMIT;";
export const ROLLBACK: "ROLLBACK;";
export const IS_POSTGRES: true;
export namespace WHERE_CLAUSE_OPERATORS {
  let _in: string;
  let _any: string;
  let _nany: string;
  let _all: string;
  let _nin: string;
  let _contains: string;
  let _contained_in: string;
  let _key_exists: string;
  let _key_exists_any: string;
  let _key_exists_all: string;
  let _text_search: string;
  let _in_array: string;
  let _nin_array: string;
  let _and: string;
  let _or: string;
  let _lt: string;
  let _lte: string;
  let _gt: string;
  let _gte: string;
  let _is: string;
  let _is_not: string;
  let _like: string;
  let _ilike: string;
  let _eq: string;
  let _neq: string;
  let _st_intersects: string;
  let _st_contains: string;
  let _st_within: string;
  let _st_distance: string;
  let _st_3d_distance: string;
  let _st_covers: string;
  let _st_overlaps: string;
  let _st_touches: string;
  let _st_crosses: string;
  let _st_disjoint: string;
  let _st_equals: string;
  let _st_d_within: string;
  let _st_nintersects: string;
  let _st_ncontains: string;
  let _st_nwithin: string;
  let _st_ncovers: string;
  let _st_noverlaps: string;
  let _st_ntouches: string;
  let _st_ncrosses: string;
  let _st_ndisjoint: string;
  let _st_nequals: string;
  let _st_nwithin: string;
}
export namespace QUERY_BINDER_KEYS {
  let _and_1: boolean;
  export { _and_1 as _and };
  let _or_1: boolean;
  export { _or_1 as _or };
}
export namespace REQUIRE_ARRAY_TRANSFORMATION {
  let _any_1: boolean;
  export { _any_1 as _any };
  let _all_1: boolean;
  export { _all_1 as _all };
  let _in_1: boolean;
  export { _in_1 as _in };
  let _nin_1: boolean;
  export { _nin_1 as _nin };
}
export namespace REQUIRE_CAST_TO_NULL {
  let _is_1: boolean;
  export { _is_1 as _is };
  let _is_not_1: boolean;
  export { _is_not_1 as _is_not };
}
export namespace IS_JSON_OPERATOR {
  let _contains_1: boolean;
  export { _contains_1 as _contains };
  let _contained_in_1: boolean;
  export { _contained_in_1 as _contained_in };
  let _key_exists_1: boolean;
  export { _key_exists_1 as _key_exists };
  let _key_exists_any_1: boolean;
  export { _key_exists_any_1 as _key_exists_any };
  let _key_exists_all_1: boolean;
  export { _key_exists_all_1 as _key_exists_all };
}
export namespace IS_JSON_KEY_OPERATOR {
  let _key_exists_2: boolean;
  export { _key_exists_2 as _key_exists };
  let _key_exists_any_2: boolean;
  export { _key_exists_any_2 as _key_exists_any };
  let _key_exists_all_2: boolean;
  export { _key_exists_all_2 as _key_exists_all };
}
export namespace IS_JSON_ARRAY_KEY_OPERATOR {
  let _key_exists_any_3: boolean;
  export { _key_exists_any_3 as _key_exists_any };
  let _key_exists_all_3: boolean;
  export { _key_exists_all_3 as _key_exists_all };
}
export namespace REQUIRE_WILDCARD_TRANSFORMATION {
  let _ilike_1: boolean;
  export { _ilike_1 as _ilike };
  export let _nilike: boolean;
}
export namespace IS_TEXT_SEARCH_OPERATOR {
  let _text_search_1: boolean;
  export { _text_search_1 as _text_search };
}
export namespace sqlTypesByDbClient {
  let POSTGRESQL_1: (
    | {
        name: string;
        value: string;
        canBeAutoIncrement: boolean;
        canBeReferencedInPrimaryKey: boolean;
        disabledPrimaryKey: boolean;
        canHaveDefaultValue: boolean;
        alias?: undefined;
        hasLength?: undefined;
        min?: undefined;
        max?: undefined;
        defaultSuggestions?: undefined;
      }
    | {
        name: string;
        value: string;
        alias: string;
        canBeAutoIncrement: boolean;
        canBeReferencedInPrimaryKey: boolean;
        disabledPrimaryKey: boolean;
        canHaveDefaultValue: boolean;
        hasLength?: undefined;
        min?: undefined;
        max?: undefined;
        defaultSuggestions?: undefined;
      }
    | {
        name: string;
        value: string;
        canBeAutoIncrement: boolean;
        canBeReferencedInPrimaryKey: boolean;
        disabledPrimaryKey: boolean;
        canHaveDefaultValue?: undefined;
        alias?: undefined;
        hasLength?: undefined;
        min?: undefined;
        max?: undefined;
        defaultSuggestions?: undefined;
      }
    | {
        name: string;
        value: string;
        alias: string;
        canBeAutoIncrement: boolean;
        canBeReferencedInPrimaryKey: boolean;
        disabledPrimaryKey: boolean;
        hasLength: boolean;
        min: number;
        max: number;
        canHaveDefaultValue: boolean;
        defaultSuggestions?: undefined;
      }
    | {
        name: string;
        value: string;
        canBeAutoIncrement: boolean;
        canBeReferencedInPrimaryKey: boolean;
        disabledPrimaryKey: boolean;
        hasLength: boolean;
        min: number;
        max: number;
        canHaveDefaultValue: boolean;
        alias?: undefined;
        defaultSuggestions?: undefined;
      }
    | {
        name: string;
        value: string;
        canBeAutoIncrement: boolean;
        canBeReferencedInPrimaryKey: boolean;
        disabledPrimaryKey: boolean;
        canHaveDefaultValue: boolean;
        defaultSuggestions: string[];
        alias?: undefined;
        hasLength?: undefined;
        min?: undefined;
        max?: undefined;
      }
  )[];
  export { POSTGRESQL_1 as POSTGRESQL };
  let MYSQL_1: (
    | {
        name: string;
        value: string;
        canBeAutoIncrement: boolean;
        canBeReferencedInPrimaryKey: boolean;
        disabledPrimaryKey: boolean;
        canHaveDefaultValue: boolean;
        hasLength?: undefined;
        min?: undefined;
        max?: undefined;
        alias?: undefined;
        defaultSuggestions?: undefined;
      }
    | {
        name: string;
        value: string;
        canBeAutoIncrement: boolean;
        hasLength: boolean;
        min: number;
        max: number;
        canBeReferencedInPrimaryKey: boolean;
        disabledPrimaryKey: boolean;
        canHaveDefaultValue: boolean;
        alias?: undefined;
        defaultSuggestions?: undefined;
      }
    | {
        name: string;
        value: string;
        alias: string;
        canBeAutoIncrement: boolean;
        canBeReferencedInPrimaryKey: boolean;
        disabledPrimaryKey: boolean;
        hasLength: boolean;
        min: number;
        max: number;
        canHaveDefaultValue: boolean;
        defaultSuggestions?: undefined;
      }
    | {
        name: string;
        value: string;
        canBeAutoIncrement: boolean;
        canBeReferencedInPrimaryKey: boolean;
        disabledPrimaryKey: boolean;
        canHaveDefaultValue: boolean;
        defaultSuggestions: string[];
        hasLength?: undefined;
        min?: undefined;
        max?: undefined;
        alias?: undefined;
      }
  )[];
  export { MYSQL_1 as MYSQL };
}
export function getSqlTypesByDBClient(client: any): any;
export namespace allowedOrderDirectionsKeys {
  let asc_nulls_first: string;
  let asc_nulls_last: string;
  let desc_nulls_first: string;
  let desc_nulls_last: string;
  let ASC: string;
  let DESC: string;
  let asc: string;
  let desc: string;
}
export namespace SupportedAggregations {
  let _count: string;
  let _min: string;
  let _max: string;
  let _avg: string;
  let _sum: string;
}
export namespace SELF_UPDATE_OPERATORS {
  let _inc: string;
  let _dec: string;
  let _mult: string;
  let _div: string;
}
export namespace EVENTS {
  let SELECT: string;
  let UPDATE: string;
  let INSERT: string;
  let DELETE: string;
  let ERROR: string;
}
// export namespace IS_POSTGIS_OPERATOR {
//   let _st_intersects: boolean;
//   let _st_contains: boolean;
//   let _st_within: boolean;
//   let _st_distance: boolean;
//   let _st_3d_distance: boolean;
//   let _st_covers: boolean;
//   let _st_overlaps: boolean;
//   let _st_touches: boolean;
//   let _st_crosses: boolean;
//   let _st_disjoint: boolean;
//   let _st_equals: boolean;
//   let _st_d_within: boolean;
//   let _st_nintersects: boolean;
//   let _st_ncontains: boolean;
//   let _st_nwithin: boolean;
//   let _st_ncovers: boolean;
//   let _st_noverlaps: boolean;
//   let _st_ntouches: boolean;
//   let _st_ncrosses: boolean;
//   let _st_ndisjoint: boolean;
//   let _st_nequals: boolean;
// }
