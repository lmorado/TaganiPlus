import styled from 'styled-components';

export const DataVisualizationWrapper = styled.div`
	background: #fff;

	.tooltip {
		position: absolute;
		text-align: center;
		color: #ffffff;
		padding: 5px;
		background: #288b1e;
		pointer-events: none;
		border-radius: 4px;
	}

	.legend, .user {
		display: flex;
		flex-direction: row;

		.legend-label {
			font-weight: bold;
		}

		span {
			margin: 5px;
		}
	}

	.user {
		span {
			font-weight: bold;
		}
	}

	.legend {
		border-bottom: 1px solid #c8ced3;
		margin-bottom: 10px;
		flex-wrap: wrap;
	}

	.diamond {
		width: 0;
		height: 0;
		border: 10px solid transparent;
		border-bottom-color: #f2a1a1;
		position: relative;
		top: -10px;
		float: left;
		margin: 0 5px 0 0;

		&:after {
			content: '';
			position: absolute;
			left: -10px;
			top: 10px;
			width: 0;
			height: 0;
			border: 10px solid transparent;
			border-top-color: #f2a1a1;
		}

		&.agent-dl {
			border-bottom-color: #288b1e;
			&:after {
				border-top-color: #288b1e;
			}
		}

		&.agent {
			border-bottom-color: #adeca7;
			&:after {
				border-top-color: #adeca7;
			}
		}
    }

	.mobile {
		.legend-label {
			width: 100%;
		}
		span {
			display: flex;
		}
	}
`;
