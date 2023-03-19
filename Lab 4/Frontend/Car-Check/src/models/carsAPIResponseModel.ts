export class APIResponse {
  collection: Collection;
  data: Instance[];
}

class Collection {
  count: number;
}
class Instance {
  name: string;
}
