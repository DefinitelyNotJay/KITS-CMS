<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import * as Select from '$lib/components/ui/select/index.js';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	console.log(data.course);

	if (!data.course) {
		throw new Error('Course not found');
	}
</script>

<div>
	{#if data.course}
		<form action="edit" class="flex flex-col gap-4">
			<div>
				<label for="title">ชื่อคอร์ส</label>
				<Input name="title" defaultValue={data.course.title} />
			</div>

			<div>
				<label for="description">คำอธิบาย</label>
				<Textarea name="description" defaultValue={data.course.description} />
			</div>

			<div>
				<label for="code">รหัสคอร์สเรียน</label>
				<Input name="code" defaultValue={data.course.code} />
			</div>

			<div>
				<label for="status">สถานะ</label>
				<Select.Root name="status" selected={data.course.status ?? 'inactive'}>
					<Select.Trigger class="w-full">
						<Select.Value placeholder="เลือกสถานะ" />
					</Select.Trigger>
					<Select.Content class="w-full">
						<Select.Item value="active">เปิดใช้งาน</Select.Item>
						<Select.Item value="inactive">ไม่พร้อมใช้งาน</Select.Item>
						<Select.Item value="archived">จัดเก็บ</Select.Item>
					</Select.Content>
				</Select.Root>
			</div>

			<div>
				<label for="price">ราคาคอร์สเรียน</label>
				<Input type="number" name="price" defaultValue={data.course.price} />
			</div>

			<!-- 3 ตัวตึง -->
			<div class="flex gap-3">
				<div>
					<label for="price">หลักสูตร</label>
					<Input type="text" name="price" defaultValue={data.course.major} />
				</div>

				<div>
					<label for="price">แขนง</label>
					<Input type="text" name="price" defaultValue={data.course.track} />
				</div>

				<div>
					<label for="price">ปี</label>
					<Input type="number" name="price" max={4} min={1} defaultValue={data.course.year} />
				</div>
			</div>

			<div>
				<label for="posterImage">รูปภาพคอร์ส</label>
				<Input type="file" name="posterImage" defaultValue={data.course.posterImage} />
			</div>

			<Button type="submit" class="px-4 py-2 rounded">บันทึก</Button>
		</form>
	{:else}
		<h1>Course not found</h1>
	{/if}
</div>
