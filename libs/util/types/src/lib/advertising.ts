export type GruvianAdvertisementSchema =
  | {
      filled: true;
      ad: {
        description: {
          data: string;
          type: 'text';
        };
        link_to: {
          data: string;
          type: 'url';
        };
        logo_image: {
          data: {
            url: string;
          };
          type: 'image';
        };
        title: {
          data: string;
          type: 'text';
        };
      };
      resolution_id: string;
    }
  | {
      filled: false;
    };
