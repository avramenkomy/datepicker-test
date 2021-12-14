import React from 'react';
import { render, fireEvent, within, waitFor, screen,
    getByRole as globalGetByRole,
    getByText as globalGetByText, 
} from '@testing-library/react'
import { unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';

import SiteBackdrop from '../components/backdrop';

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe('test render', () => {
    it('first test', async () => {
        render(<SiteBackdrop open_state={true} />, container);

        const backdropElement = await screen.findByRole('progressbar', { hidden: true });
        expect(backdropElement).toBeInTheDocument();

        userEvent.click(backdropElement);
        expect(backdropElement).toBeInTheDocument();

        screen.debug();
    });
});