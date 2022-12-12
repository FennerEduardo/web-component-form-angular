export interface Options {
    id: number;
    title: string;
    imageURL: string;
  }

  export interface NIds {
    nid: Number;
  }

  export interface Self {
    href: string;
  }

  export interface Links {
    self: Self;
  }

  export interface Meta {
    links: Links;
  }

  export interface Jsonapi {
    version: string;
    meta: Meta;
  }

  export interface Describedby {
    href: string;
  }

  export interface Self2 {
    href: string;
  }

  export interface Links2 {
    describedby: Describedby;
    self: Self2;
  }

  export interface Path {
    alias: string;
    pid: number;
    langcode: string;
  }

  export interface FieldDescription {
    value: string;
    format: string;
    processed: string;
  }

  export interface FieldEnlaceMicrositio {
    uri: string;
    title: string;
    options: any[];
  }

  export interface FieldSummary {
    value: string;
    format: string;
    processed: string;
  }

  export interface Attributes {
    drupal_internal__tid: number;
    drupal_internal__nid: number;
    drupal_internal__vid: number;
    langcode: string;
    revision_timestamp: Date;
    revision_log?: any;
    status: boolean;
    title: string;
    name: string;
    created: Date;
    changed: Date;
    promote: boolean;
    sticky: boolean;
    default_langcode: boolean;
    revision_translation_affected: boolean;
    metatag?: any;
    path: Path;
    rh_action: string;
    rh_redirect?: any;
    rh_redirect_response: number;
    rh_redirect_fallback_action: string;
    publish_on?: any;
    unpublish_on?: any;
    content_translation_source: string;
    content_translation_outdated: boolean;
    display_page_title: boolean;
    field_description: FieldDescription;
    field_domain_all_affiliates: boolean;
    field_enlace_micrositio: FieldEnlaceMicrositio;
    field_summary: FieldSummary;
    field_tipo_programa: string;
    field_abc_programa: FieldAbcPrograma;
    path_image?: null | string;
  }

  export interface Meta2 {
    drupal_internal__target_id: string;
  }

  export interface Data {
    type: string;
    id: string;
    meta: Meta2;
  }

  export interface Related {
    href: string;
  }

  export interface Self3 {
    href: string;
  }

  export interface Links3 {
    related: Related;
    self: Self3;
  }

  export interface NodeType {
    data: Data;
    links: Links3;
  }

  export interface Meta3 {
    drupal_internal__target_id: number;
  }

  export interface Data2 {
    type: string;
    id: string;
    meta: Meta3;
  }

  export interface Related2 {
    href: string;
  }

  export interface Self4 {
    href: string;
  }

  export interface Links4 {
    related: Related2;
    self: Self4;
  }

  export interface RevisionUid {
    data: Data2;
    links: Links4;
  }

  export interface Meta4 {
    drupal_internal__target_id: number;
  }

  export interface Data3 {
    type: string;
    id: string;
    meta: Meta4;
  }

  export interface Related3 {
    href: string;
  }

  export interface Self5 {
    href: string;
  }

  export interface Links5 {
    related: Related3;
    self: Self5;
  }

  export interface Uid {
    data: Data3;
    links: Links5;
  }

  export interface Meta5 {
    alt: string;
    title: string;
    width: number;
    height: number;
    drupal_internal__target_id: number;
  }

  export interface Data4 {
    type: string;
    id: string;
    meta: Meta5;
  }

  export interface Related4 {
    href: string;
  }

  export interface Self6 {
    href: string;
  }

  export interface Links6 {
    related: Related4;
    self: Self6;
  }

  export interface FieldDetailImage {
    data: Data4;
    links: Links6;
  }

  export interface Meta6 {
    drupal_internal__target_id: string;
  }

  export interface Datum2 {
    type: string;
    id: string;
    meta: Meta6;
  }

  export interface Related5 {
    href: string;
  }

  export interface Self7 {
    href: string;
  }

  export interface Links7 {
    related: Related5;
    self: Self7;
  }

  export interface FieldDomainAccess {
    data: Datum2[];
    links: Links7;
  }

  export interface Related6 {
    href: string;
  }

  export interface Self8 {
    href: string;
  }

  export interface Links8 {
    related: Related6;
    self: Self8;
  }

  export interface FieldDomainSource {
    data?: any;
    links: Links8;
  }

  export interface Meta7 {
    alt: string;
    title: string;
    width: number;
    height: number;
    drupal_internal__target_id: number;
  }

  export interface Data5 {
    type: string;
    id: string;
    meta: Meta7;
  }

  export interface Related7 {
    href: string;
  }

  export interface Self9 {
    href: string;
  }

  export interface Links9 {
    related: Related7;
    self: Self9;
  }

  export interface FieldLogoPrograma {
    data: Data5;
    links: Links9;
  }

  export interface Relationships {
    node_type: NodeType;
    revision_uid: RevisionUid;
    uid: Uid;
    field_detail_image: FieldDetailImage;
    field_domain_access: FieldDomainAccess;
    field_domain_source: FieldDomainSource;
    field_logo_programa: FieldLogoPrograma;
  }

  export interface Datum {
    type: string;
    id: string;
    links: Links2;
    attributes: Attributes;
    relationships: Relationships;
  }

  export interface Next {
    href: string;
  }

  export interface Self10 {
    href: string;
  }

  export interface Links10 {
    next: Next;
    self: Self10;
  }

  export interface RootObject {
    jsonapi: Jsonapi;
    data: Datum[];
    included: Included[];
    links: Links10;
  }

  export interface Included {
    type: string;
    id: string;
    links: Links10;
    attributes: Attributes2;
    relationships: Relationships2;
  }

  export interface Attributes2 {
    drupal_internal__fid: number;
    langcode: string;
    filename: string;
    uri: Uri;
    filemime: string;
    filesize: number;
    status: boolean;
    created: Date;
    changed: Date;
  }

  export interface Relationships2 {
    uid: Uid2;
  }

  export interface Uid2 {
    data: Data6;
    links: Links11;
  }

  export interface Data6 {
    type: string;
    id: string;
    meta: Meta8;
  }

  export interface Links11 {
    related: Related8;
    self: Self11;
  }

  export interface Meta8 {
    drupal_internal__target_id: number;
  }

  export interface Related8 {
    href: string;
  }

  export interface Self11 {
    href: string;
  }

  export interface Uri {
    value: string;
    url: string;
  }

  export interface FieldAbcPrograma {
    value: string;
    format: string;
    processed?: string;
  }
