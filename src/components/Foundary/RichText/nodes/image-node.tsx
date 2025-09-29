'use client'

import type {
  DOMConversionMap,
  DOMConversionOutput,
  LexicalNode,
  Spread,
} from '@payloadcms/richtext-lexical/lexical'
import type { SerializedDecoratorBlockNode } from '@payloadcms/richtext-lexical/lexical/react/LexicalDecoratorBlockNode'

import { UploadNode as ClientUploadNode } from '@payloadcms/richtext-lexical/client'

import ObjectID from 'bson-objectid'
import RawUploadComponent from '../components/RawUploadComponent'

// ⬇️ Infer UploadData instead of importing it
type UploadData = Parameters<
  typeof import('@payloadcms/richtext-lexical/client').$createUploadNode
>[0]['data']

export type SerializedUploadNode = {
  children?: never
  type: 'upload'
} & Spread<UploadData, SerializedDecoratorBlockNode>

function $convertUploadElement(domNode: HTMLImageElement): DOMConversionOutput | null {
  if (
    domNode.hasAttribute('data-lexical-upload-relation-to') &&
    domNode.hasAttribute('data-lexical-upload-id')
  ) {
    const id = domNode.getAttribute('data-lexical-upload-id')
    if (id) {
      const node = $createMyUploadNode({
        fields: {},
        relationTo: 'media',
        value: id,
      })
      return { node }
    }
  }
  const img = domNode
  if (img.src.startsWith('file:///')) return null
  return null
}

export class UploadNode extends ClientUploadNode {
  static override importDOM(): DOMConversionMap<HTMLImageElement> {
    return { img: () => ({ conversion: $convertUploadElement, priority: 0 }) }
  }

  static override importJSON(serialized: SerializedUploadNode): UploadNode {
    if (serialized.version === 1 && (serialized?.value as any)?.id) {
      serialized.value = (serialized.value as any).id
    }
    if (serialized.version === 2 && !serialized?.id) {
      serialized.id = new ObjectID().toHexString()
      serialized.version = 3
    }

    const data: UploadData = {
      id: serialized.id ?? new ObjectID().toHexString(),
      fields: serialized.fields,
      relationTo: 'media',
      value: serialized.value,
    }

    const node = $createMyUploadNode(data)
    // optional, if present on your version
    node.setFormat?.(serialized.format)
    return node as UploadNode
  }

  override decorate() {
    // Prefer public getters if available in your version; keep this narrow:
    return <RawUploadComponent data={this.__data} nodeKey={this.getKey()} />
  }
}

export function $createMyUploadNode(data: UploadData): UploadNode {
  return new UploadNode({ data } as any)
}

export function $isUploadNode(node: LexicalNode | null | undefined): node is UploadNode {
  return node instanceof UploadNode
}
