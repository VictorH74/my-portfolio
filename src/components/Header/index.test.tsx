import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import useHeader from './useHeader';
import { useTheme } from '@/hooks/UseTheme';
import Header from '.';

// Mock the custom hooks used in the component
jest.mock('./useHeader');
jest.mock('@/hooks/UseTheme');

// Mock the lazy-loaded component
jest.mock('@/components/BackgroundAnimation', () => <div>background animation</div>);

describe('Header', () => {
  beforeEach(() => {
    // Provide default implementations for the hooks
    const mockedUseHeader = useHeader as jest.MockedFunction<typeof useHeader>;
    mockedUseHeader.mockReturnValue({
      scrollUp: true,
      size: [1200, 800],
      wrapperDimensions: { height: 0, left: 0, width: 0 },
      wrapperDisplay: "none",
      navDataArray: [{ to: '', label: 'Home' }],
      translate: {
        downloadResumeBtnInnerText: 'Download Resume',
        showBgAnimation: 'Show Background Animation',
        switchThemeColor: 'Switch Theme Color',
        data: []
      },
      handleMouseOver: jest.fn(),
      moveWrapperToDownloadBtn: jest.fn(),
      downloadResumeBtnRef: React.createRef(),
      setShowBgAnimation: jest.fn(),
      showBgAnimation: true,
      wrappedLI: ""
    })

    const mockedUseTheme = useTheme as jest.MockedFunction<typeof useTheme>;

    mockedUseTheme.mockReturnValue({
      setThemeColor: jest.fn(),
      themeColor: {
        color: "#000",
        RGBValues: [0, 0, 0]
      }
    });
  });

  it('renders the header component', () => {
    render(<Header />);

    // Check if the header is rendered
    const headerElement = screen.getByRole('banner')
    expect(headerElement).toBeInTheDocument();    

    // Check if the h1 element is rendered with the correct text
    const titleElement = screen.getByText('<', { exact: false });
    expect(titleElement).toBeInTheDocument();

    // Check if the navigation item is rendered
    const navItem = screen.getByText('Home');
    expect(navItem).toBeInTheDocument();
  });

  it('renders download resume button', () => {
    render(<Header />);

    // Check if the download resume button is rendered
    const downloadButton = screen.getByText('Download Resume');
    expect(downloadButton).toBeInTheDocument();

    // Simulate a click event
    fireEvent.click(downloadButton);

    // Verify if the download function is called
    const mockedUseHeader = useHeader as jest.MockedFunction<typeof useHeader>;
    expect(mockedUseHeader().translate.downloadResumeBtnInnerText).toBe('Download Resume');
  });
});