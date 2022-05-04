import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Main from './main';

test('Render Main Component', () => {
  const {container, getByText} = render(<Main />);
  expect(getByText('Alarms Views')).toBeInTheDocument();
  fireEvent.click(getByText('Logout'));
  expect(getByText('Do you want to logout?')).toBeInTheDocument();
});
