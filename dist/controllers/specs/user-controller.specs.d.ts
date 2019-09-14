export declare const UserProfileSchema: {
    type: string;
    required: string[];
    properties: {
        id: {
            type: string;
        };
        email: {
            type: string;
        };
        name: {
            type: string;
        };
    };
};
export declare const CredentialsRequestBody: {
    description: string;
    required: boolean;
    content: {
        'application/json': {
            schema: {
                type: string;
                required: string[];
                properties: {
                    email: {
                        type: string;
                        format: string;
                    };
                    password: {
                        type: string;
                        minLength: number;
                    };
                };
            };
        };
    };
};
