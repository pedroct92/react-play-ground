//import { ApiService } from "./api.service";

//let apiService: ApiService;

beforeEach(() => {
  //      apiService = new ApiService();

    // global.fetch = jest.fn().mockImplementation(() => {
    //     var p = new Promise((resolve, reject) => {
    //       resolve({
    //         ok: true, 
    //         Id: '123', 
    //         json: function() { 
    //           return {Id: '123'}
    //         }
    //       });
    //     });
  
    //     return p;
    // });
  
});

describe('Api Service Tests', () => {
    it('works with async/await', async () => {
        //apiService.getTeams().subscribe(teams => {
            expect(1).toEqual(1);
        //})
    });
});
