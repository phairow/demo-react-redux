jest.mock('pubnub-redux', () => {
  const actual = jest.requireActual('pubnub-redux');

  return {
    ...actual,
    createSpace: jest.fn(() => ({ type: 'TEST_CREATE_SPACE' })),
    fetchSpaces: jest.fn(() => ({ type: 'TEST_FETCH_SPACES' })),
    fetchUserById: jest.fn(() => ({ type: 'TEST_FETCH_USER' })),
    fetchMemberships: jest.fn(() => ({ type: 'TEST_FETCH_MEMBERSHIPS' })),
    joinSpaces: jest.fn(() => ({ type: 'TEST_JOIN_SPACES' })),
    leaveSpaces: jest.fn(() => ({ type: 'TEST_LEAVE_SPACES' })),
  };
});

jest.mock('pubnub-react', () => ({
  usePubNub: () => ({
    subscribe: jest.fn(),
    unsubscribeAll: jest.fn(),
    fetchUsers: jest.fn(),
    fetchMemberships: jest.fn(),
    fetchSpaces: jest.fn(),
    publish: jest.fn(),
  }),
  PubNubProvider: ({ children }: { children: any }) => children,
}));

jest.mock('react-toast-notifications', () => ({
  ToastProvider: ({ children }: { children: any }) => children,
  useToasts: () => ({
    addToast: jest.fn(),
  }),
}));
