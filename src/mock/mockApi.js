import { MOCK_USER, MOCK_STATS, MOCK_VERIFICATIONS, MOCK_API_KEYS, MOCK_BILLING, MOCK_ACTIVITY } from './mockData';

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApi = {
    auth: {
        login: async (email, password) => {
            await delay(800);
            if (email === "demo@intactid.com" && password === "demo123") {
                return {
                    token: "mock_jwt_token_xyz123",
                    user: MOCK_USER
                };
            }
            throw new Error("Invalid credentials");
        },
        getUser: async () => {
            await delay(300);
            return MOCK_USER;
        }
    },

    dashboard: {
        getStats: async () => {
            await delay(600);
            return MOCK_STATS;
        },
        getActivity: async () => {
            await delay(500);
            return MOCK_ACTIVITY;
        }
    },

    verifications: {
        getList: async (page = 1, limit = 20, statusFilter = 'all') => {
            await delay(700);
            let filtered = MOCK_VERIFICATIONS;

            if (statusFilter !== 'all') {
                filtered = filtered.filter(v => v.status === statusFilter);
            }

            const start = (page - 1) * limit;
            const end = start + limit;

            return {
                data: filtered.slice(start, end),
                pagination: {
                    currentPage: page,
                    totalPages: Math.ceil(filtered.length / limit),
                    totalItems: filtered.length
                }
            };
        },
        getById: async (id) => {
            await delay(400);
            return MOCK_VERIFICATIONS.find(v => v.id === id);
        }
    },

    apiKeys: {
        list: async () => {
            await delay(500);
            return MOCK_API_KEYS;
        },
        create: async (name) => {
            await delay(1000);
            const newKey = {
                id: `key_new_${Date.now()}`,
                name: name,
                prefix: "ix_live_",
                created: new Date().toISOString(),
                lastUsed: null,
                status: "active",
                key: `ix_live_${Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2)}` // Full key returned once
            };
            return newKey;
        },
        revoke: async (id) => {
            await delay(800);
            return { success: true, id };
        }
    },

    billing: {
        getDetails: async () => {
            await delay(600);
            return MOCK_BILLING;
        }
    }
};
