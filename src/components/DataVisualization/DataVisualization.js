import React, { PureComponent } from 'react';
import { DataVisualizationWrapper } from './styles';
import * as d3 from 'd3';
import { debounce } from '../../utils/helpers'
import { getLocalStorage, saveLocalStorage } from '../../utils/localStorage'
// const data = require('./mockData.json');

class DataVisualization extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			xPos: 0,
			yPos: 0,
			scale: 1,
			windowWidth: 900,
			windowHeight: 600,
			openNodes: []
		}

		this.ref = React.createRef()
		this.reScaleTree = this.reScaleTree.bind(this)
		saveLocalStorage('openedNodes', [])
		saveLocalStorage('isParentNode', false)
	}

	reScaleTree = () => {
		this.setState({windowWidth: window.innerWidth, windowHeight: window.innerHeight})
		d3.select("#tree").remove();
		this.drawTree(this.props.data)
	}

	componentDidMount() {
		let resizeFn = debounce(this.reScaleTree, 250)
		window.addEventListener('resize', resizeFn)
	}

	componentDidUpdate(prevProps) {
		if (prevProps.data !== this.props.data) {
			this.drawTree(this.props.data)
		}
	}

	componentWillUnmount() {
		let resizeFn = debounce(this.reScaleTree, 250)
		window.removeEventListener('resize', resizeFn);
	}


	drawTree(d) {
		const newData = {...d[0]}
		const root = d3.hierarchy(newData);

		const getDepth = ({ children }) => 1 +
			(children ? Math.max(...children.map(getDepth)) : 0)

		const totalLevels = getDepth(root) + 2

		const width = this.state.windowWidth + 100
		const currentWidth = this.state.windowWidth
		const dx = 40
		const dy = width / totalLevels
		const margin = ({top: 10, right: 120, bottom: 10, left: dy});
		const tree = d3.tree().nodeSize([dx, dy])
		const diagonal = d3.linkHorizontal().x(d => d.y).y(d => d.x)

		root.x0 = dy / 2;
		root.y0 = 0;
		root.descendants().forEach((d, i) => {
			d.id = i;
			d._children = d.children;

			const openedNodes = getLocalStorage('openedNodes')
			const opened = openedNodes.indexOf(d.data.userId) > -1

			if (d.depth && d.data.userName.length !== 7 && !opened) d.children = null;
		});

		const svg = d3.create("svg")
			.attr("viewBox", [-margin.left, -margin.top, width, dx])
			.attr("width", "90%")
			.attr("height", this.state.windowHeight)
			.style("font", "10px sans-serif")
			.style("user-select", "none");

		const gLink = svg.append("g")
			.attr("id", "link")
			.attr("fill", "none")
			.attr("stroke", "#555")
			.attr("stroke-opacity", 0.4)
			.attr("stroke-width", 1.5);

		const gNode = svg.append("g")
			.attr("id", "node")
			.attr("cursor", "pointer")
			.attr("pointer-events", "all");


		// save open nodes for resize
		function clickedNodes(n) {
			let openedNodes = getLocalStorage('openedNodes')

			if (n.children === null) {
				openedNodes = openedNodes.filter(node => node !== n.data.userId)
			} else {
				openedNodes.push(n.data.userId)
			}

			saveLocalStorage('openedNodes', openedNodes)
		}

		// Define the div for the tooltip
		const div = d3.select("#DataVisualizationWrapper").append("div")
			.attr("class", "tooltip")
			.style("opacity", 0);

		// get selection dimensions
		function computeDimensions(selection) {
			let dimensions = null;
			let node = selection.node();
			if (node instanceof SVGElement) {
				dimensions = node.getBBox();
			} else {
				dimensions = node.getBoundingClientRect();
			}
			return dimensions;
		}

		function getTextLength(currentWidth) {
			let mobileChar = 4
			switch (true) {
				case currentWidth <= 320:
					mobileChar = 3
					break;
				case currentWidth < 420 && currentWidth > 320:
					mobileChar = 5
					break;
				case currentWidth < 620 && currentWidth > 420:
					mobileChar = 7
					break;
				case currentWidth < 700 && currentWidth > 620:
					mobileChar = 9
					break;
				case currentWidth > 700 && currentWidth < 900:
					mobileChar = 11
					break;
				case currentWidth >= 900:
					// mobileChar = ((width / (totalLevels + 2)) / (totalLevels + 2)) - 6
					mobileChar = 12
					break;
				default:
					break;
			}

			return mobileChar
		}

		function update(source) {
			let isParentNode = getLocalStorage('isParentNode')
			const marginLeft = !isParentNode ? margin.left : (dy + 100)
			const duration = d3.event && d3.event.altKey ? 2500 : 250;
			const nodes = root.descendants().reverse();
			const links = root.links();
			// Compute the new tree layout.
			tree(root);

			let left = root;
			let right = root;

			root.eachBefore(node => {
				if (node.x < left.x) left = node;
				if (node.x > right.x) right = node;
			});

			const height = right.x - left.x + margin.top + margin.bottom;
			const transition = svg.transition()
				.duration(duration)
				.attr("id", "tree")
				.attr("viewBox", d => {
					return [-marginLeft, left.x - margin.top, width, height]
				})
				.attr("width", "100%")
				.attr("height", `${height}px`)
				.tween("resize", window.ResizeObserver ? null : () => () => svg.dispatch("toggle"));

			// Update the nodes…
			const node = gNode.selectAll("g")
				.data(nodes, d => d.id);

			// Enter any new nodes at the parent's previous position.
			const nodeEnter = node.enter().append("g")
				.attr("transform", d => `translate(${source.y0},${source.x0})`)
				.attr("fill-opacity", 0)
				.attr("stroke-opacity", 0)
				.on("click", d => {
					d.children = d.children ? null : d._children;

					if (d.data.userId === root.data.userId) {
						isParentNode = getLocalStorage('isParentNode')
						saveLocalStorage("isParentNode", !isParentNode)
					}

					// clickedNodes(d);
					// update(d);

					if (d3.event.target.tagName !== 'text') {
						clickedNodes(d);
						update(d);
					}

				});

			nodeEnter.append("circle")
				.attr("r", 8)
				.attr("fill", d =>
					d && d.data && d.data.userType === 10 && d._children ? "#288b1e" :
					(d && d.data && d.data.userType === 30 ? "#f2a1a1" : "#adeca7"))
				.attr("stroke-width", 10)

			let clicked = {}

			const stringLength = getTextLength(currentWidth)

			const fullLabel = nodeEnter.append("text")
				.attr("dy", "0.31em")
				.attr("x", d => d._children ? -9999999 : 999999)
				.style("font-size", "14px")
				.attr("id", d => d.data.userName)
				.text(d => {
					let userName = d.data.userName
					return userName
				})

			nodeEnter.append("text")
				.attr("dy", "0.31em")
				.attr("class", d => `label_${d.data.userId}`)
				.attr("x", d => d._children ? -10 : 10)
				.attr("text-anchor", d => d._children ? "end" : "start")
				.style("font-size", "14px")
				.text((d, i) => {

					let userName = d.data.userName
					if (userName.length > stringLength) {
						userName = userName.substr(0, stringLength) + '...'
					}

					return userName
				})
				.on("click", function(d, i) {
					clicked[d.data.userId] = !clicked[d.data.userId]

					const shortenName = d3.select(this).text()
					const isShorten = shortenName.substring(shortenName.length, stringLength) === '...'

					if (isShorten) {
						const divWidth = computeDimensions(fullLabel).width

						div.transition()
						.duration(200)
						.style("opacity", .9)

						if ((d3.event.pageX + divWidth) > currentWidth) {
							div.text(d.data.userName)
								.style("left", (d3.event.pageX - (divWidth / 2))  + "px")
								.style("top", (d3.event.pageY) + "px");
						} else {
							div.text(d.data.userName)
								.style("left", (d3.event.pageX) + "px")
								.style("top", (d3.event.pageY) + "px");
						}

						this.divTimeout = setTimeout(() => {
							div.transition()
								.duration(500)
								.style("opacity", 0);

							clearTimeout(this.divTimeout)
						}, 2000)
					}
				})
				.clone(true).lower()
				.attr("class", "clone2")
				.attr("stroke-linejoin", "round")
				.attr("stroke-width", 10)
				.attr("stroke", "white")


			// Transition nodes to their new position.
			const nodeUpdate = node.merge(nodeEnter).transition(transition)
				.attr("transform", d => `translate(${d.y},${d.x})`)
				.attr("fill-opacity", 1)
				.attr("stroke-opacity", 1);

			// Transition exiting nodes to the parent's new position.
			const nodeExit = node.exit().transition(transition).remove()
				.attr("transform", d => `translate(${source.y},${source.x})`)
				.attr("fill-opacity", 0)
				.attr("stroke-opacity", 0);

			// Update the links…
			const link = gLink.selectAll("path")
				.data(links, d => {
					return d.target.id
				});

			// Enter any new links at the parent's previous position.
			const linkEnter = link.enter().append("path")
				.attr("d", d => {
					const o = {x: source.x0, y: source.y0};
					return diagonal({source: o, target: o});
				});

			// Transition links to their new position.
			link.merge(linkEnter).transition(transition)
				.attr("d", diagonal);

			// Transition exiting nodes to the parent's new position.
			link.exit().transition(transition).remove()
				.attr("d", d => {
					const o = {x: source.x, y: source.y};
					return diagonal({source: o, target: o});
				});

			// Stash the old positions for transition.
			root.eachBefore(d => {
				d.x0 = d.x;
				d.y0 = d.y;
			});
		}

		update(root);

		if (this.ref.current) {
			this.ref.current.append(svg.node())
		}
	}



	render() {
		const { data } = this.props
		const userName = data && data[0] && data[0].userName ? data[0].userName : 'USER'
		const isMobile = window.innerWidth < 812 ? "mobile" : ""

		return <DataVisualizationWrapper ref={this.ref} className="DataVisualizationWrapper" id="DataVisualizationWrapper" style={{width: '100%', height: this.state.windowHeight, overflow: 'auto'}}>
					<div className="user">
						<span>{`${userName} Downline Hierarchy`}</span>
					</div>
					<div className={`legend ${isMobile}`}>
						<span className="legend-label">Legend:</span>
						<span><div className="diamond agent-dl"></div> Agent</span>
						<span><div className="diamond agent"></div> Agent w/o downline</span>
						<span><div className="diamond member"></div> Member</span>
					</div>
				</DataVisualizationWrapper>
	}
}

export default DataVisualization;
