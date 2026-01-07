import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Bank Wonogiri API",
            version: "1.0.0",
            description: "API Documentation untuk PT. BPR Bank Wonogiri",
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Development Server",
            },
            {
                url: "https://company-profile-production-f757.up.railway.app",
                description: "Production Server (Railway)",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
            schemas: {
                // Auth Schemas
                Login: {
                    type: "object",
                    required: ["email", "password"],
                    properties: {
                        email: {
                            type: "string",
                            format: "email",
                            example: "admin@bankwonogiri.co.id",
                        },
                        password: {
                            type: "string",
                            minLength: 6,
                            example: "password123",
                        },
                    },
                },
                Register: {
                    type: "object",
                    required: ["name", "email", "password"],
                    properties: {
                        name: {
                            type: "string",
                            minLength: 3,
                            example: "Admin Bank",
                        },
                        email: {
                            type: "string",
                            format: "email",
                            example: "admin@bankwonogiri.co.id",
                        },
                        password: {
                            type: "string",
                            minLength: 6,
                            example: "password123",
                        },
                    },
                },
                ChangePassword: {
                    type: "object",
                    required: ["oldPassword", "newPassword"],
                    properties: {
                        oldPassword: {
                            type: "string",
                            example: "oldpassword123",
                        },
                        newPassword: {
                            type: "string",
                            minLength: 6,
                            example: "newpassword123",
                        },
                    },
                },
                // Activity Schema
                Activity: {
                    type: "object",
                    properties: {
                        _id: {
                            type: "string",
                            example: "507f1f77bcf86cd799439011",
                        },
                        action: {
                            type: "string",
                            enum: ["create", "update", "delete"],
                            example: "create",
                        },
                        resource: {
                            type: "string",
                            enum: ["news", "team", "gallery", "publication", "service"],
                            example: "news",
                        },
                        resourceName: {
                            type: "string",
                            example: "Berita Baru",
                        },
                        userId: {
                            type: "string",
                            example: "507f1f77bcf86cd799439011",
                        },
                        userName: {
                            type: "string",
                            example: "Admin",
                        },
                        createdAt: {
                            type: "string",
                            format: "date-time",
                            example: "2026-01-07T10:00:00Z",
                        },
                    },
                },
                // Gallery Schema
                Gallery: {
                    type: "object",
                    properties: {
                        _id: {
                            type: "string",
                            example: "507f1f77bcf86cd799439011",
                        },
                        title: {
                            type: "string",
                            example: "Gallery Title",
                        },
                        description: {
                            type: "string",
                            example: "Gallery Description",
                        },
                        images: {
                            type: "array",
                            items: {
                                type: "string",
                                format: "binary",
                            },
                            example: ["image1.jpg", "image2.jpg"],
                        },
                        createdAt: {
                            type: "string",
                            format: "date-time",
                            example: "2026-01-07T10:00:00Z",
                        },
                    },
                },
                // News Schema
                News: {
                    type: "object",
                    properties: {
                        _id: {
                            type: "string",
                            example: "507f1f77bcf86cd799439011",
                        },
                        title: {
                            type: "string",
                            example: "News Title",
                        },
                        description: {
                            type: "string",
                            example: "News Description",
                        },
                        images: {
                            type: "array",
                            items: {
                                type: "string",
                                format: "binary",
                            },
                            example: ["image1.jpg", "image2.jpg"],
                        },
                        createdAt: {
                            type: "string",
                            format: "date-time",
                            example: "2026-01-07T10:00:00Z",
                        },
                    },
                },
                // Publication Schema
                Publication: {
                    type: "object",
                    properties: {
                        _id: {
                            type: "string",
                            example: "507f1f77bcf86cd799439011",
                        },
                        title: {
                            type: "string",
                            example: "Publication Title",
                        },
                        description: {
                            type: "string",
                            example: "Publication Description",
                        },
                        images: {
                            type: "array",
                            items: {
                                type: "string",
                                format: "binary",
                            },
                            example: ["image1.jpg", "image2.jpg"],
                        },
                        createdAt: {
                            type: "string",
                            format: "date-time",
                            example: "2026-01-07T10:00:00Z",
                        },
                    },
                },
                // Service Schema
                Service: {
                    type: "object",
                    properties: {
                        _id: {
                            type: "string",
                            example: "507f1f77bcf86cd799439011",
                        },
                        title: {
                            type: "string",
                            example: "Service Title",
                        },
                        description: {
                            type: "string",
                            example: "Service Description",
                        },
                        images: {
                            type: "array",
                            items: {
                                type: "string",
                                format: "binary",
                            },
                            example: ["image1.jpg", "image2.jpg"],
                        },
                        createdAt: {
                            type: "string",
                            format: "date-time",
                            example: "2026-01-07T10:00:00Z",
                        },
                    },
                },
                // Team Schema
                Team: {
                    type: "object",
                    properties: {
                        _id: {
                            type: "string",
                            example: "507f1f77bcf86cd799439011",
                        },
                        name: {
                            type: "string",
                            example: "Team Name",
                        },
                        position: {
                            type: "string",
                            example: "Team Position",
                        },
                        images: {
                            type: "array",
                            items: {
                                type: "string",
                                format: "binary",
                            },
                            example: ["image1.jpg", "image2.jpg"],
                        },
                        createdAt: {
                            type: "string",
                            format: "date-time",
                            example: "2026-01-07T10:00:00Z",
                        },
                    },
                },
                // User Schema
                User: {
                    type: "object",
                    properties: {
                        _id: {
                            type: "string",
                            example: "507f1f77bcf86cd799439011",
                        },
                        name: {
                            type: "string",
                            example: "User Name",
                        },
                        email: {
                            type: "string",
                            example: "user@example.com",
                        },
                        role: {
                            type: "string",
                            example: "User Role",
                        },
                        createdAt: {
                            type: "string",
                            format: "date-time",
                            example: "2026-01-07T10:00:00Z",
                        },
                    },
                },
            },
        },
    },
    apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

export default function swaggerDocs(app) {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    
    // Endpoint untuk get swagger JSON
    app.get("/api-docs.json", (req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
    });
}