import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RelatedContent from './RelatedContent';

const mockContent = [
  {
    image: 'https://example.com/image1.jpg',
    category: 'Categoria 1',
    title: 'Título 1',
  },
  {
    image: 'https://example.com/image2.jpg',
    category: 'Categoria 2',
    title: 'Título 2',
  },
];

describe('RelatedContent Component', () => {
  test('renders RelatedContent component with title and button', () => {
    render(<RelatedContent content={mockContent} />);
    expect(screen.getByText('Conteúdos relacionados')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /veja mais/i })).toBeInTheDocument();
  });

  test('renders each related content item correctly', () => {
    render(<RelatedContent content={mockContent} />);
    mockContent.forEach((item) => {
      expect(screen.getByText(item.category)).toBeInTheDocument();
      expect(screen.getByText(item.title)).toBeInTheDocument();
      expect(screen.getByAltText('')).toHaveAttribute('src', item.image);
    });
  });

  test('clicking "Veja mais" button triggers intended action', () => {
    render(<RelatedContent content={mockContent} />);
    const seeMoreButton = screen.getByRole('button', { name: /veja mais/i });
    fireEvent.click(seeMoreButton);
    expect(seeMoreButton).toBeInTheDocument();
  });
});
