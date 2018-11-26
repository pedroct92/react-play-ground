
describe('testing api', () => {
    beforeEach(() => {
        window.fetch = jest.fn().mockImplementation(() => Promise.resolve([{ id: 1}]));
    })
  
    it('calls teams', () => {
        fetch('').then(x => {
            expect(x).toBeDefined();
        })
    })
  });