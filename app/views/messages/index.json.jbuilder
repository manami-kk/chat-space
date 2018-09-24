json.array! @new_messages do |message|
	json.created_at  format_posted_time(message.created_at)
	json.text        message.text
	json.image       message.image.url
	json.user_name   message.user.name
	json.id          message.id
end
