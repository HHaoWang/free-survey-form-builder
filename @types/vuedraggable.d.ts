declare module 'vuedraggable' {
  export interface ChangeEvent {
    added?: {
      newIndex: number;
      element: {
        [prop: string]: any;
      };
    };
    removed?: {
      oldIndex: number;
      element: {
        [prop: string]: any;
      };
    };
    moved?: {
      oldIndex: number;
      newIndex: number;
      element: {
        [prop: string]: any;
      };
    };
  }
}
