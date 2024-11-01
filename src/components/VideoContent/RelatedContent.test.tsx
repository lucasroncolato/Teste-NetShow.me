
import React from 'react';
import { render, screen } from '@testing-library/react';
import RelatedContent from './RelatedContent';

const mockContent = [
  {
    image: 'http://example.com/image1.jpg',
    category: 'Category 1',
    title: 'Related Content 1',
  },
  {
    image: 'http://example.com/image2.jpg',
    category: 'Category 2',
    title: 'Related Content 2',
  },
];

describe('RelatedContent', () => {
  it('renders without crashing', () => {
    render(<RelatedContent content={mockContent} />);
    expect(screen.getByText('Conteúdos relacionados')).toBeInTheDocument();
  });

  it('displays the correct number of related items', () => {
    render(<RelatedContent content={mockContent} />);
    expect(screen.getAllByRole('article')).toHaveLength(2);
  });

  it('shows the correct titles for related content', () => {
    render(<RelatedContent content={mockContent} />);
    expect(screen.getByText('Related Content 1')).toBeInTheDocument();
    expect(screen.getByText('Related Content 2')).toBeInTheDocument();
  });

  it('displays categories for related content', () => {
    render(<RelatedContent content={mockContent} />);
    expect(screen.getByText('Category 1')).toBeInTheDocument();
    expect(screen.getByText('Category 2')).toBeInTheDocument();
  });

  it('renders the "See More" button', () => {
    render(<RelatedContent content={mockContent} />);
    expect(screen.getByText('Veja mais')).toBeInTheDocument();
  });
});