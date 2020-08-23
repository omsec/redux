import * as CourseActions from './course.actions';

describe('Course', () => {
  it('should create an instance', () => {
    expect(new CourseActions.LoadCourses()).toBeTruthy();
  });
});
