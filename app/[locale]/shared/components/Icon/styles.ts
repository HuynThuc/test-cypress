import styled, { css } from 'styled-components';

interface RootProps {
  $useCurrentColor?: boolean;
  $altAlignment?: boolean;
  $size?: string;
}

const baseStyles = css<RootProps>`
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  & svg {
    height: ${({ $size }) => $size || '1.5em'};
    width: ${({ $size }) => $size || '1.5em'};
    line-height: inherit;
    vertical-align: middle;
  }
  ${({ $size }) =>
    $size &&
    css`
      display: inline-block;
      width: ${$size};
      height: ${$size};
    `}
`;

const altAlignmentStyles = css`
  & svg {
    vertical-align: middle;
  }
`;

const useCurrentColorStyles = css`
  svg,
  svg * {
    fill: currentcolor;
  }
`;

export const Root = styled.span<RootProps>(
  ({ $useCurrentColor, $altAlignment }) => css`
    ${baseStyles}

    ${$altAlignment && altAlignmentStyles}
    ${$useCurrentColor && useCurrentColorStyles}
  `,
);
