import {
  describe, it, get,
} from 'parrot-friendly';
import tasksSuccess from '../mocks/tasksSuccess';

const scenarios = describe('Scenarios', () => {
  const uri = '/todos';
  it('successfully loads todo tasks', () => {
    get(uri)
      .response(tasksSuccess)
      .delay(1200);
  });
});

export default scenarios;
