( function (blocks, editor, components, i18n, element ) {

	var el = wp.element.createElement
	var registerBlockType = wp.blocks.registerBlockType
	var BlockControls = wp.editor.BlockControls
	var AlignmentToolbar = wp.editor.AlignmentToolbar
	var MediaUpload = wp.editor.MediaUpload
	var InspectorControls = wp.editor.InspectorControls
	var TextControl = components.TextControl

	registerBlockType( 'pdf-viewer-block/standard', {
	title: i18n.__('PDF Viewer'),
	description: i18n.__('A block to embed a PDF Viewer.'),
	icon: 'media-document',
	keywords: [ i18n.__( 'pdf' ), i18n.__( 'viewer' ), i18n.__( 'reader' ) ],
	category: 'embed',
	attributes: {
		mediaID: {
			type: 'number'
		},
		mediaURL: {
    		type: 'string',
			source: 'attribute',
			selector: 'a',
			attribute: 'href'
		},
		mediaWidth: {
			type: 'string',
			source: 'attribute',
			selector: 'a',
			attribute: 'data-width'
		},
		mediaHeight: {
			type: 'string',
			source: 'attribute',
			selector: 'a',
			attribute: 'data-height'
		},
		alignment: {
			type: 'string',
			default: 'left'
		},
	},

	edit: function (props) {
		var attributes = props.attributes
		var mediaWidth = props.attributes.mediaWidth
		var mediaHeight = props.attributes.mediaHeight
		var alignment = props.attributes.alignment

		var onSelectPDF = function (media) {
			return props.setAttributes({
				mediaURL: media.url,
				mediaID: media.id,
				'data-width': '',
				'data-height': '',
			})
		}

		function onChangeAlignment (newAlignment) {
			props.setAttributes({ alignment: newAlignment })
		}

		return [
			el(BlockControls, { key: 'controls' },
				el(
					'div', { className: 'components-toolbar' },
					el(MediaUpload, {
						onSelect: onSelectPDF,
						type: 'a',
						render: function (obj) {
							return el(
								components.Button, {
									className: 'components-icon-button components-toolbar__control',
									onClick: obj.open
								},
								el(
									'svg', { 
										className: 'dashicon dashicons-edit', 
										width: '20', 
										height: '20' 
									},
									el(
										'path', { 
											d: 'M2.25 1h15.5c.69 0 1.25.56 1.25 1.25v15.5c0 .69-.56 1.25-1.25 1.25H2.25C1.56 19 1 18.44 1 17.75V2.25C1 1.56 1.56 1 2.25 1zM17 17V3H3v14h14zM10 6c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2zm3 5s0-6 3-6v10c0 .55-.45 1-1 1H5c-.55 0-1-.45-1-1V8c2 0 3 4 3 4s1-3 3-3 3 2 3 2z' 
										}
									)
								)
							)
						}
					})
				),
				el(
					AlignmentToolbar, {
            			value: alignment,
						onChange: onChangeAlignment
					}
				)
			),
			el(
				InspectorControls,
				{ key: 'inspector' },
				el(
					components.PanelBody, {
						title: i18n.__('PDF Viewer'),
						className: 'block-pdf-viewer',
						initialOpen: true
					},
					el('p', {}, i18n.__('Click on the PDF icon to replace the PDF file.')),
					el('p', {}, i18n.__('The PDF Viewer’s size is 100% / 700px by default. You can set custom (pixels) size below.')),
					el(
						TextControl, {
							type: 'number',
							label: i18n.__('Width (pixels)'),
							value: mediaWidth,
							onChange: function (newMediaWidth) {
								props.setAttributes({ mediaWidth: newMediaWidth })
							}
						}
					),
					el(
						TextControl, {
							type: 'number',
							label: i18n.__('Height (pixels)'),
							value: mediaHeight,
							onChange: function (newMediaHeight) {
								props.setAttributes({ mediaHeight: newMediaHeight })
							}
						}
					),
				)
			),
			el(
				'div', { className: props.className },
				el(
					'div', {
						className: attributes.mediaID ? 'pdf-viewer pdf-upload-active' : 'pdf-viewer pdf-upload-inactive',
						style: { textAlign: alignment },
					},
					el(
						MediaUpload, {
							onSelect: onSelectPDF,
							type: 'application/pdf',
							value: attributes.mediaID,
							render: function (obj) {
								return el(
									components.Button, {
										className: attributes.mediaID ? 'pdf-button' : 'button button-large',
										onClick: obj.open
									},
									!attributes.mediaID ? i18n.__('Upload PDF') : 
									el(
										'a', { 
											href: attributes.mediaURL,
											'data-width': attributes.mediaWidth ? attributes.mediaWidth : '',
											'data-height': attributes.mediaHeight ? attributes.mediaHeight : '',
										}
									)
								)
							}
						}
					)
				),
			)
		]
	},

	save: function (props) {
		var attributes = props.attributes
		var mediaWidth = props.attributes.mediaWidth
		var mediaHeight = props.attributes.mediaHeight
		var alignment = props.attributes.alignment

		return (
			el(
				'div', { 
					className: props.className, 
					style: { textAlign: alignment } 
				},
				el(
					'div', { className: 'uploaded-pdf' },
					el(
						'a', { 
							href: attributes.mediaURL,
							'data-width': attributes.mediaWidth ? attributes.mediaWidth : '',
							'data-height': attributes.mediaHeight ? attributes.mediaHeight : '',
	        			}
					)
				),
			)
		)
	}

})

})(
	window.wp.blocks,
	window.wp.editor,
	window.wp.components,
	window.wp.i18n,
	window.wp.element
)